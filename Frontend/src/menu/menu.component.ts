import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-root',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  showFiller = false;

  constructor(private router: Router) {}

  goList(name: string) {
    switch (name) {
      case 'users':
        this.router.navigate(['/users']);
        break;
      case 'product':
        this.router.navigate(['/produtos/']);
        break;
      case 'fornecedor':
        this.router.navigate(['/fornecedores']);
        break;
      case 'cliente':
        this.router.navigate(['/clientes']);
        break;
      case 'servico':
        this.router.navigate(['/servicos']);
        break;
      case 'atendimento': // Adicionado para Atendimento List
        this.router.navigate(['/atendimentos']);
        break;
      case 'atendserv': // Adicionado para AtendServ List
        this.router.navigate(['/atendserv']);
        break;  
      case 'profissional': // Adicionado para Profissional List
        this.router.navigate(['/profissionais']);
        break;
      default:
        break;
    }
  }

  goForm(name: string) {
    switch (name) {
      case 'users':
        this.router.navigate(['/users']);
        break;
      case 'product':
        this.router.navigate(['/produtos/cadastro/']);
        break;
      case 'fornecedor':
        this.router.navigate(['/fornecedores']);
        break;
      case 'fornecedor-form':
        this.router.navigate(['/fornecedores/novo']);
        break;
      case 'cliente':
        this.router.navigate(['/clientes']);
        break;
      case 'cliente-form':
        this.router.navigate(['/clientes/novo']);
        break;
      case 'servico':
        this.router.navigate(['/servicos']);
        break;
      case 'servico-form':
        this.router.navigate(['/servicos/novo']);
        break;
      case 'atendimento': // Adicionado para Atendimento List
        this.router.navigate(['/atendimentos']);
        break;
      case 'atendimento-form': // Adicionado para Atendimento Formulário
        this.router.navigate(['/atendimentos/novo']);
        break;
      case 'atendserv': // Adicionado para AtendServ Formulário
        this.router.navigate(['/atendserv']);
        break;  
      case 'profissional': // Adicionado para Profissional Formulário
        this.router.navigate(['/profissionais']);
        break;
      case 'profissional-form': // Adicionado para Profissional Formulário
        this.router.navigate(['/profissionais/novo']);
        break;
      default:
        break;
    }
  }
}
