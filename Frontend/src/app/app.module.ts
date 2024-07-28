import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'src/menu/menu.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnityListModule } from 'src/unity/unityList/unityList.module';
import { UnityService } from 'src/api/services/unity.services';
import { HttpClientModule } from '@angular/common/http';
import { UnityFormModule } from 'src/unity/unityForm/unityForm.module';
import { AppRoutingModule } from './app-router.module';
import { UnityComponent } from 'src/unity/unity.component';
import { UnityModule } from 'src/unity/unity.module';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/api/services/product.services';
import { GrpAcessService } from 'src/api/services/grpacess.services';
import { GrpAcessModule } from 'src/grpacess/grpacess.module';
import { FormsModule } from '@angular/forms'; // Certifique-se de importar FormsModule
import { LoginComponent } from 'src/login/login.component';
import { HomeComponent } from 'src/home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserViewComponent } from './users/user-view/user-view.component';

@NgModule({
  declarations: [AppComponent, LoginComponent,  HomeComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent, UserViewComponent  ],
  providers: [UnityService, ProductService,GrpAcessService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenuModule,
    UnityModule,
    ProductModule,
    GrpAcessModule,
    AppRoutingModule ,
    BrowserModule,
    FormsModule         
  ],
})
export class AppModule {}
