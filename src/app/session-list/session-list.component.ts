import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  public sessions: any[] = [];
  public dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'sessionName'];
  isAdmin: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sessionService: SessionService, private router: Router , private authService : AuthService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.roles.includes("ADMIN"); // Vérifier si l'utilisateur est un administrateur
    this.fetchSessions();
    if (this.isAdmin) {
      this.displayedColumns.push('edit', 'delete');
    }
  }

  fetchSessions() {
    this.sessionService.getSessions().subscribe(
      (data: any[]) => {
        this.sessions = data;
        this.dataSource = new MatTableDataSource<any>(this.sessions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des sessions :', error);
      }
    );
  }

  editSession(id: number) {
    this.router.navigate(['/update-session', id]);
  }

  deleteSession(session: any) {
    if (confirm("Are you sure you want to delete this session?")) {
      this.sessionService.deleteSession(session.id).subscribe(() => {
        this.fetchSessions(); // Recharger la liste des sessions après la suppression
      });
    }
  }

  filterData(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  viewSessionReservations(session: any) {
    // Rediriger vers la page pour afficher les réservations de la session avec l'ID correspondant
    this.router.navigateByUrl("/session-reservations/" + session.id);
  }
}
