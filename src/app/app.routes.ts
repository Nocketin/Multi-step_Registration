import { Routes } from '@angular/router';
import { RegistrationShellComponent } from './pages/registrationPage/registration-shell/registration-shell.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  { path: 'registration', component: RegistrationShellComponent },
  { path: '**', redirectTo: 'registration' },
];
