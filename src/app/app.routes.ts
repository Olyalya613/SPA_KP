import { Routes } from '@angular/router';
import { PhonesListComponent } from './phones-list/phones-list.component';
import { PhoneFormComponent } from './phone-form/phone-form.component';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: PhonesListComponent, canActivate: [authGuard] },
  { path: 'create', component: PhoneFormComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: PhoneFormComponent, canActivate: [authGuard] },
  { path: 'view/:id', component: PhoneDetailsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
