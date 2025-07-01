import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// Importação dos componentes de Servico
import { ServicoListComponent } from './servico/servico-list/servico-list.component';
import { ServicoFormComponent } from './servico/servico-list/servico-form.component';


import { GrpAcessComponent } from 'src/grpacess/grpacess.component';
import { GrpacessFormComponent } from 'src/grpacess/grpacessForm/grpacessForm.component';
import { LoginComponent } from 'src/login/login.component';
import { HomeComponent } from 'src/home/home.component';
import { AuthGuard } from 'src/api/services/auth.guard';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserViewComponent } from './users/user-view/user-view.component';
import { FornecedorListComponent } from './fornecedor/fornecedor-list/fornecedor-list.component';
import { FornecedorFormComponent } from './fornecedor/fornecedor-list/fornecedor-form.component';

// Novos componentes Cliente
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente/cliente-list/cliente-form.component';

// Importação dos componentes de Atendimento
import { AtendimentoListComponent } from './atendimento/atendimento-list/atendimento-list.component';
import { AtendimentoFormComponent } from './atendimento/atendimento-list/atendimento-form.component';

// Novos componentes Profissional
import { ProfissionalListComponent } from './profissional/profissional-list/profissional-list.component';
import { ProfissionalFormComponent } from './profissional/profissional-list/profissional-form.component';

// Importação dos componentes de AtendServ
import { AtendServListComponent } from './atendserv/atendserv-list/atendserv-list.component';
import { AtendServFormComponent } from './atendserv/atendserv-list/atendserv-form.component';

import { ProdutoListComponent } from './produtos/produtos-list/produtos-list.component';
import { AgendamentoListComponent } from './agendamento/agendamento-list/agendamento-list.component'; // Importação do componente de agendamento


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserViewComponent, canActivate: [AuthGuard] },
  { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'users/view', component: UserViewComponent, canActivate: [AuthGuard] },
  { path: 'fornecedores', component: FornecedorListComponent, canActivate: [AuthGuard] },
  { path: 'fornecedores/novo', component: FornecedorFormComponent, canActivate: [AuthGuard] },
  { path: 'fornecedores/:id/editar', component: FornecedorFormComponent, canActivate: [AuthGuard] },

  // Rotas para Cliente
  { path: 'clientes', component: ClienteListComponent, canActivate: [AuthGuard] },
  { path: 'clientes/novo', component: ClienteFormComponent, canActivate: [AuthGuard] },
  { path: 'clientes/:id/editar', component: ClienteFormComponent, canActivate: [AuthGuard] },

  // Rotas para Servico
  { path: 'servicos', component: ServicoListComponent, canActivate: [AuthGuard] },
  { path: 'servicos/novo', component: ServicoFormComponent, canActivate: [AuthGuard] },
  { path: 'servicos/:id/editar', component: ServicoFormComponent, canActivate: [AuthGuard] },

  // Rotas para Atendimento
  { path: 'atendimentos', component: AtendimentoListComponent, canActivate: [AuthGuard] },
  { path: 'atendimentos/novo', component: AtendimentoFormComponent, canActivate: [AuthGuard] },
  { path: 'atendimentos/:id/editar', component: AtendimentoFormComponent, canActivate: [AuthGuard] },
 
  // Rotas para AtendServ
  { path: 'atendserv', component: AtendServListComponent, canActivate: [AuthGuard] },
  { path: 'atendserv/novo', component: AtendServFormComponent, canActivate: [AuthGuard] },
  { path: 'atendserv/:id/editar', component: AtendServFormComponent, canActivate: [AuthGuard] },
  { path: 'atendserv/:codAtend/:codCli', component: AtendServListComponent },
  { path: 'atend-serv/:codAtend/:codCli', component: AtendServListComponent }, // <-- Adicione esta linha

  // Rotas para Profissional
  { path: 'profissionais', component: ProfissionalListComponent, canActivate: [AuthGuard] },
  { path: 'profissionais/novo', component: ProfissionalFormComponent, canActivate: [AuthGuard] },
  { path: 'profissionais/:id/editar', component: ProfissionalFormComponent, canActivate: [AuthGuard] },

  // Rotas para Produtos
  { path: 'produtos', component: ProdutoListComponent, canActivate: [AuthGuard] },
  { path: 'produtos/novo', component: ProdutoListComponent, canActivate: [AuthGuard] },
  { path: 'produtos/:id/editar', component: ProdutoListComponent, canActivate: [AuthGuard] },

  // Rota para Agendamento
  { path: 'agendamentos', component: AgendamentoListComponent, canActivate: [AuthGuard] }, // Nova rota adicionada

  {
    path: 'unidades',
    component: GrpAcessComponent,
    children: [
      {
        path: '',
        component: GrpacessFormComponent,
        title: 'Lista de Grupos - SCV',
      },
      {
        path: 'cadastro',
        component: GrpacessFormComponent,
        title: 'Cadastro de Grupos - SCV',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
