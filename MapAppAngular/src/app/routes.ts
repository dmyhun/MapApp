import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user/user.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes : Routes = [
    { path: 'home', component : HomeComponent, canActivate:[AuthGuard]},
    { path: 'account', component : UserComponent},
    { path: '', redirectTo : '/account', pathMatch: 'full'}
];