import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-router.module';

import { MenuModule } from 'src/menu/menu.module';
import { UnityModule } from 'src/unity/unity.module';
import { GrpAcessModule } from 'src/grpacess/grpacess.module';

import { UnityService } from 'src/api/services/unity.services';
import { GrpAcessService } from 'src/api/services/grpacess.services';
import { FornecedorService } from 'src/api/services/fornecedor.services';
import { ClienteService } from 'src/api/services/cliente.services';
import { ServicoService } from 'src/api/services/servico.services';
import { AtendimentoService } from 'src/api/services/atendimento.services'; // Importar AtendimentoService
import { ProfissionalService } from 'src/api/services/profissional.services';
import { AtendServService } from 'src/api/services/atendserv.services';
import { ProdutoService } from 'src/api/services/produtos.services';

import { LoginComponent } from 'src/login/login.component';
import { HomeComponent } from 'src/home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserViewComponent } from './users/user-view/user-view.component';

import { FornecedorListComponent } from './fornecedor/fornecedor-list/fornecedor-list.component';
import { FornecedorFormComponent } from './fornecedor/fornecedor-list/fornecedor-form.component';

import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente/cliente-list/cliente-form.component';
import { ServicoFormComponent } from './servico/servico-list/servico-form.component';
import { ServicoListComponent } from './servico/servico-list/servico-list.component';

import { AtendimentoListComponent } from './atendimento/atendimento-list/atendimento-list.component'; // Importar AtendimentoListComponent
import { AtendimentoFormComponent } from './atendimento/atendimento-list/atendimento-form.component'; // Importar AtendimentoFormComponent

import { ProfissionalListComponent } from './profissional/profissional-list/profissional-list.component';
import { ProfissionalFormComponent } from './profissional/profissional-list/profissional-form.component';

import { AtendServListComponent } from './atendserv/atendserv-list/atendserv-list.component';
//import { AtendServFormComponent } from './atendserv/atendserv-list/atendserv-form.component'

import { ServiceWorkerModule } from '@angular/service-worker';

import { CurrencyFormatPipe } from './currency-format.pipe'; // Ajuste o caminho con
import { PercentageFormatPipe } from './percentage-format.pipe'; // Ajuste o caminho con

import {ImageUploadComponent} from './image-upload/image-upload.component'; // Ajuste o caminho con
//import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

//import { ProdutosListComponent } from './produtos/';
import { ProdutoListComponent } from './produtos/produtos-list/produtos-list.component';
import { AgendamentoListComponent } from './agendamento/agendamento-list/agendamento-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserViewComponent,
    FornecedorListComponent,
    FornecedorFormComponent,
    ProdutoListComponent,
    ClienteFormComponent,
    ClienteListComponent,
    ServicoFormComponent,
    ServicoListComponent,
    AtendimentoListComponent,  // Declarar AtendimentoListComponent
    AtendimentoFormComponent,  // Declarar AtendimentoFormComponent
    ProfissionalListComponent,
    ProfissionalFormComponent,
    AtendServListComponent,
    CurrencyFormatPipe, // Adicione o pipe aqui
    PercentageFormatPipe, // Adicione o pipe aqui
    ImageUploadComponent,
    ProdutoListComponent,
    AgendamentoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MenuModule,
    UnityModule,
    GrpAcessModule,
    AppRoutingModule,
   // NgxMaskDirective,
   // NgxMaskPipe,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    UnityService,
    GrpAcessService,
    FornecedorService,
    ClienteService,
    ServicoService,
    AtendimentoService, // Adicionar AtendimentoService aos providers
    ProfissionalService ,
    AtendServService,
    ProdutoService,
   // provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
