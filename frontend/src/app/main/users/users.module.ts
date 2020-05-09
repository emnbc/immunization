import { NgModule } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { AutocompleteModule } from '../../core/autocomplete/autocomplete.module';
import { SharedModule } from '../../shared/shared.module';
import { SortingModule } from '../../core/sorting/sorting.module';
import { AddEditUserModalComponent } from './add-edit-user-modal/add-edit-user-modal.component';

import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserModalComponent
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
