import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminsComponent } from './layouts/admins/admins.component';
import { AuthsComponent } from './layouts/auths/auths.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminsComponent,
    // canActivate: [AuthGuard],
    children: [{
      path: 'ad',
      loadChildren: () => import("./../app/layouts/admins/admins.module").then(e => e.AdminsModule)
    }]
  },
  {
    path: 'auth',
    component: AuthsComponent,
    children: [{
      path: 'au',
      loadChildren: () => import("./../app/layouts/auths/auths.module").then(e => e.AuthsModule)
    }]
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
