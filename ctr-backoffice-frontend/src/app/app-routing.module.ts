import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocaleListComponent} from './locale-list/locale-list.component';
import {AppResourceComponent} from './appresource/appresource.component';
import {AppResourceDetailComponent} from './appresource-detail/appresource-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LocaleComponent} from './locale/locale.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { DashboardPhysicianComponent } from './dashboard-physician/dashboard-physician.component';

const routes: Routes = [
  {path: 'appresource', component: AppResourceComponent},
  {path: 'appresource/:id', component: AppResourceDetailComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'locale/:code', component: LocaleComponent},
  {path: 'locales', component: LocaleListComponent},
  {path: 'physician', component: TodoComponent},
  {path: 'site', component: TodoComponent},
  {path: 'sponsor', component: TodoComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard-physician', component: DashboardPhysicianComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
