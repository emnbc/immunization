import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ArtistsComponent } from './artists/artists.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { UsersComponent } from './users/users.component';
import { OthersComponent } from './others/others.component';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: { name: 'Dashboard', icon: 'fa-home', navVisible: true }
            },
            {
                path: 'patients',
                loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule),
                data: { name: 'Patients', icon: 'fa-sliders', navVisible: true }
            },
            {
                path: 'vaccines',
                loadChildren: () => import('./vaccines/vaccines.module').then(m => m.VaccinesModule),
                data: { name: 'Vaccines', icon: 'fa-medkit', navVisible: true }
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
                data: { name: 'Users', icon: 'fa-edit', navVisible: true }
            },
            {
                path: 'about',
                component: OthersComponent,
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