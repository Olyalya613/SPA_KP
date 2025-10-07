import { Routes } from '@angular/router';
import { PhonesListComponent } from './phones-list/phones-list.component';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { PhoneFormComponent } from './phone-form/phone-form.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: PhonesListComponent },
  { path: 'phones/new', component: PhoneFormComponent, canActivate: [AuthGuard] },
  { path: 'phones/:id', component: PhoneDetailsComponent },
  { path: 'phones/:id/edit', component: PhoneFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];
