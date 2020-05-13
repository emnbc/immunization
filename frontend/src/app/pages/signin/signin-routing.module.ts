import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';

const routes: Routes = [
  {path: '', component: SigninComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class SigninRoutingModule { }
