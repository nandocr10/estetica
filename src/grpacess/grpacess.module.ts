import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-router.module';
import { GrpAcessComponent } from './grpacess.component';

import { GrpacessFormModule } from './grpacessForm/grpacessForm.module';
import { GrpAcessListModule } from './grpacessList/grpacessList.module';

@NgModule({
  declarations: [GrpAcessComponent],
  providers: [],
  imports: [GrpAcessListModule, GrpacessFormModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [GrpAcessComponent],
})
export class GrpAcessModule {}
