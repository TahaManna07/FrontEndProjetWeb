import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  isAdmin: boolean = false; // Propriété pour vérifier si l'utilisateur est un administrateur

  constructor(public  authService : AuthService,private router:Router) {
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login")
  }


  ngOnInit() {
    this.isAdmin = this.authService.roles.includes("ADMIN"); // Vérifier si l'utilisateur est un administrateur
  }

}
