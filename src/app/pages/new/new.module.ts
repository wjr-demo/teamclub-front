import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './new.routing';
import { NewComponent } from './new.component';
@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    NewComponent
  ]
})
export class NewModule {

}
