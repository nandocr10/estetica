import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
//import { GrpAcessComponent } from 'src/grpacess/gpracess.component';
//import { GpracessFormComponent } from 'src/grpacess/gpracessForm/gpracessForm.component';
import { ProductComponent } from 'src/product/product.component';
import { ProductFormComponent } from 'src/product/productForm/productForm.component';
import { ProductListComponent } from 'src/product/productList/productList.component';
import { UnityComponent } from 'src/unity/unity.component';
import { UnityFormComponent } from 'src/unity/unityForm/unityForm.component';
import { UnityListComponent } from 'src/unity/unityList/unityList.component';

import { GrpAcessComponent } from 'src/grpacess/grpacess.component';
import { GrpacessFormComponent } from 'src/grpacess/grpacessForm/grpacessForm.component';
import { LoginComponent } from 'src/login/login.component';
import { HomeComponent } from 'src/home/home.component';
import { AuthGuard } from 'src/api/services/auth.guard';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserViewComponent } from './users/user-view/user-view.component';
//import { AuthGuard } from 'src/api/services/auth.guard';


const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent ,},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserViewComponent, canActivate: [AuthGuard] },
  { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'users/view', component: UserViewComponent, canActivate: [AuthGuard] },
  

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
  {
    path: 'produtos',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        title: 'Lista de produtos - SCV',
      },
      {
        path: 'cadastro',
        component: ProductFormComponent,
        title: 'Cadastro de produtos - SCV',
      },
    ],
  },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes),    BrowserModule, FormsModule ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
