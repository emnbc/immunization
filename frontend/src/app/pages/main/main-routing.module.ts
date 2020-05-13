import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: { name: 'Dashboard', icon: 'fa-tachometer', navVisible: true }
            },
            {
                path: 'patients',
                loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule),
                data: { name: 'Patients', icon: 'fa-id-card-o', navVisible: true }
            },
            {
                path: 'vaccines',
                loadChildren: () => import('./vaccines/vaccines.module').then(m => m.VaccinesModule),
                data: { name: 'Vaccines', icon: 'fa-medkit', navVisible: true }
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
                data: { name: 'Users', icon: 'fa-users', navVisible: true }
            },
            {
                path: 'about',
                component: AboutComponent,
                data: { name: 'About', icon: 'fa-question-circle', navVisible: true }
            }
        ]
    }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }