/**
 * Angular default browser supported module
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Http client module for XMLHttpRequest
import { HttpClientModule } from '@angular/common/http';
// Reactive form module for handling forms & validation
import { ReactiveFormsModule } from '@angular/forms';
// Steps module for steps tab
import { StepsModule } from 'primeng/steps';
// Tab view module for tabs
import { TabViewModule } from 'primeng/tabview';
// Toast module for good looking alert message box
import { ToastModule } from 'primeng/toast';
// Message module for good looking alert message box
import { MessageModule } from 'primeng/message';
// App routing module for http url handler
import { AppRoutingModule } from './app-routing.module';

/**
 * All the logic related components
 */
import { AppComponent } from './app.component';
import { AlertComponent } from './core/components/alert/alert.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InputComponent } from './core/components/input/input.component';
import { FormComponent } from './core/components/form/form.component';
import { ClaimPolicyComponent } from './components/claim-policy/claim-policy.component';
import { PolicyDetailsComponent } from './components/policy/policy-details/policy-details.component';
import { TableComponent } from './core/components/table/table.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    InputComponent,
    FormComponent,
    ClaimPolicyComponent,
    PolicyDetailsComponent,
    TableComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StepsModule,
    TabViewModule,
    ToastModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
