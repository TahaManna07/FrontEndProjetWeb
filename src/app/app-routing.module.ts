import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationListComponent} from "./reservation-list/reservation-list.component";
import {UserListComponent} from "./user-list/user-list.component";
import {SessionListComponent} from "./session-list/session-list.component";
import {AddSessionComponent} from "./add-session/add-session.component";
import {AddReservationComponent} from "./add-reservation/add-reservation.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {authorizationGuard} from "./guards/authorization.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path  : "admin", component: AdminTemplateComponent, canActivate : [AuthenticationGuard] , children : [
      { path: 'reservations', component: ReservationListComponent },
      { path: 'sessions', component: SessionListComponent },
      { path: 'add-session', component: AddSessionComponent },
      { path: 'add-reservation', component: AddReservationComponent },
      { path: 'users', component: UserListComponent , canActivate : [AuthenticationGuard, authorizationGuard] , data: {role : "ADMIN"} },
      { path: 'notAuthorized', component: NotAuthorizedComponent }

    ]},
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
