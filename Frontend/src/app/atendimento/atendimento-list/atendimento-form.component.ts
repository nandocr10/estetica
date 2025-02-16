import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService, Atendimento } from 'src/api/services/atendimento.services';

@Component({
  selector: 'app-atendimento-form',
  templateUrl: './atendimento-form.component.html',
})
export class AtendimentoFormComponent implements OnInit {
  atendimento: Atendimento = {
    CodAtend: 0,
    Codcli: 0,
    DtAgen: new Date(),
    DtCad: new Date(),
    DtVenda: new Date(),
    Obs: '',
    servicos: []
  };

  constructor(
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.atendimentoService.getAtendimentoById(id).subscribe((data) => {
        this.atendimento = data;
      });
    }
  }

  saveAtendimento(): void {
    if (this.atendimento.CodAtend) {
      // Atualiza o atendimento existente
      this.atendimentoService.update(this.atendimento).subscribe(() => {
        this.router.navigate(['/atendimentos']);
      });
    } else {
      // Cria um novo atendimento
      this.atendimentoService.create(this.atendimento).subscribe(() => {
        this.router.navigate(['/atendimentos']);
      });
    }
  }
}
