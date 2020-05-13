import { NgModule } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { AutocompleteModule } from '../../../core/autocomplete/autocomplete.module';
import { SharedModule } from '../../../shared/shared.module';
import { SortingModule } from '../../../core/sorting/sorting.module';
import { UserModalComponent } from './user-modal/user-modal.component';

import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserModalComponent
  ],
  imports: [
    UsersRoutingModule,
    AutocompleteModule,
    SharedModule,
    SortingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
