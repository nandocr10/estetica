import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoService, Atendimento } from 'src/api/services/agendamento.service';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.css']
})
export class AgendamentoListComponent implements OnInit, OnDestroy {
  agendamentosPorData: { [key: string]: any[] } = {};
  days: string[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  currentWeekStart: Date = new Date();
  currentWeekEnd: Date = new Date();
  private timer: any;

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.calculateCurrentWeek();
    this.loadAgendamentos();
    this.timer = setInterval(() => {
      this.cdr.detectChanges();
    }, 60000); // Atualiza a cada minuto
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  calculateCurrentWeek(): void {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay();
    this.currentWeekStart = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek);
    this.currentWeekEnd = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek + 6);
  }

  loadAgendamentos(): void {
    this.agendamentosPorData = {};

    this.agendamentoService.getAgendamentos().subscribe((agendamentos) => {
      const agendamentosPorSemanaTemp: { [key: string]: any[] } = {
        Domingo: [],
        Segunda: [],
        Terça: [],
        Quarta: [],
        Quinta: [],
        Sexta: [],
        Sábado: [],
      };

      agendamentos.forEach((atendimento) => {
        if (atendimento.atendServ && Array.isArray(atendimento.atendServ)) {
          this.agendamentoService.getCliente(atendimento.Codcli).subscribe((cliente) => {
            atendimento.atendServ.forEach(servico => {
              // Aqui, apenas converte a data normalmente
              const dataServico = servico.DtAgen ? new Date(servico.DtAgen) : null;

              if (
                dataServico &&
                dataServico >= this.currentWeekStart &&
                dataServico <= this.currentWeekEnd
              ) {
                const diaSemana = this.days[dataServico.getDay()];
                agendamentosPorSemanaTemp[diaSemana].push({
                  CodAtend: servico['CodAtend'] ?? atendimento.CodAtend,
                  CodCli: atendimento.Codcli,
                  cliente: cliente.NmCli || 'Cliente não informado',
                  servico: servico['servico']?.DsServ || 'Serviço não especificado',
                  data: dataServico.toLocaleDateString(),
                  hora: dataServico.toLocaleTimeString(),
                  telefone: (cliente as any).FoneCli || (cliente as any).fone || (cliente as any).telefone || ''
                });
              }
            });

            this.agendamentosPorData = { ...agendamentosPorSemanaTemp };
          });
        } else {
          console.warn(`Nenhum serviço encontrado para o atendimento: ${JSON.stringify(atendimento)}`);
        }
      });
    });
  }

  navigateWeek(direction: string): void {
    const daysToAdd = direction === 'next' ? 7 : -7;
    this.currentWeekStart = new Date(this.currentWeekStart.setDate(this.currentWeekStart.getDate() + daysToAdd));
    this.currentWeekEnd = new Date(this.currentWeekEnd.setDate(this.currentWeekEnd.getDate() + daysToAdd));
    this.loadAgendamentos();
  }

  detalharServico(CodAtend: number, CodCli: number): void {
    this.router.navigate(['/atendserv', CodAtend, CodCli]);
  }

  novoAtendimento(day: string): void {
    const data = this.getDateForDay(day);
    // Navega para a tela de Atendimento, passando a data como parâmetro se desejar
    this.router.navigate(['/atendimentos'], { queryParams: { data: data.toISOString().slice(0, 10) } });
  }

  getIconClass(servico: string): string {
    if (!servico) return 'fa-solid fa-question-circle';
    const s = servico.toLowerCase();
    if (s.includes('cabelo')) return 'fa-solid fa-scissors';
    if (s.includes('unha')) return 'fa-solid fa-hand-sparkles';
    if (s.includes('massagem')) return 'fa-solid fa-spa';
    if (s.includes('depilação')) return 'fa-solid fa-venus';
    if (s.includes('sobrancelha')) return 'fa-solid fa-eye';
    // Adicione mais regras conforme seus serviços
    return 'fa-solid fa-star';
  }

  getDateForDay(day: string): Date {
    const dayIndex = this.days.indexOf(day);
    const date = new Date(this.currentWeekStart);
    date.setDate(this.currentWeekStart.getDate() + dayIndex);
    return date;
  }

  isFiveMinutesBefore(appointment: any): boolean {
    if (!appointment.hora || !appointment.data) return false;
    // Suporta data dd/MM/yyyy e hora HH:mm
    const [day, month, year] = appointment.data.split('/');
    const [hour, minute] = appointment.hora.split(':');
    const atendimentoDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
    const now = new Date();
    const diff = (atendimentoDate.getTime() - now.getTime()) / 60000; // diferença em minutos
    return diff > 0 && diff <= 5;
  }

  enviarZap(appointment: any, event: Event) {
    event.stopPropagation(); // Para não acionar o detalharServico
    const phone = appointment.telefone;
    const message =
      `Olá ${appointment.cliente}, tudo bem?\n\n` +
      `Seu atendimento de *${appointment.servico}* está agendado para o dia ${appointment.data} às ${appointment.hora}.\n\n` +
      `Por favor, responda *Sim* para confirmar ou *Não* para cancelar.\n\n` +
      `Qualquer dúvida, estamos à disposição.\n` +
      `Será um prazer recebê-lo(a) em nossa clínica! 😘`;

    this.http.post('http://localhost:3000/whatsappRoute/send-whatsapp', { phone, message }).subscribe({
      next: () => alert('Mensagem enviada pelo WhatsApp!'),
      error: () => alert('Erro ao enviar WhatsApp.')
    });
  }
}
