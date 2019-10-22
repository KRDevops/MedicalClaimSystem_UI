import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClaimPolicyComponent } from './components/claim-policy/claim-policy.component';
import { PolicyDetailsComponent } from './components/policy/policy-details/policy-details.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'claim-policy', component: ClaimPolicyComponent
  },
  {
    path: 'dashboard',
    // component: PolicyDetailsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'list-all', pathMatch: 'full'
      },
      {
        path: 'list-all', component: PolicyDetailsComponent
      }
    ]
  },
  {
    path: '', redirectTo: 'claim-policy', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
