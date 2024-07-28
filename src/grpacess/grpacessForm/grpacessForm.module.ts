import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrpacessFormComponent } from './grpacessForm.component';

@NgModule({
  declarations: [GrpacessFormComponent],
  providers: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [GrpacessFormComponent],
})
export class GrpacessFormModule {}
