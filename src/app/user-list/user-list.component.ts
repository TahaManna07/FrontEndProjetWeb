import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: any[] = [];
  public dataSource: MatTableDataSource<any>; // Spécifiez le type de données ici
  public displayedColumns = ['id', 'name', 'email', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource<any>([]); // Spécifiez également le type de données ici
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: any[]) => { // Spécifiez également le type de données ici
        this.users = data;
        this.dataSource = new MatTableDataSource<any>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
      }
    );
  }

  editUser(id: number) {
    this.router.navigate(['/update-user', id]);
  }

  deleteUser(user: any) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.fetchUsers(); // Recharger la liste des utilisateurs après la suppression
      });
    }
  }

  filterData(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  viewUserReservations(user: any) {
    // Rediriger vers la page pour afficher les réservations de l'utilisateur avec l'ID correspondant
    this.router.navigateByUrl("/user-reservations/" + user.id);
  }
}
