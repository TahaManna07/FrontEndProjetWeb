import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userName', 'sessionName', 'date'];
  dataSource!: MatTableDataSource<any>;
  isAdmin: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reservationService: ReservationService, private router: Router , private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.roles.includes("ADMIN");

    this.fetchReservations();
    if (this.isAdmin) {
      this.displayedColumns.push('edit', 'delete');
    }
  }

  fetchReservations() {
    this.reservationService.getReservations().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editReservation(id: number) {
    this.router.navigate(['/update-reservation', id]);
  }

  deleteReservation(reservation: any) {
    if (confirm("Are you sure you want to delete this reservation?")) {
      this.reservationService.deleteReservation(reservation.id).subscribe(() => {
        this.fetchReservations(); // Recharger la liste des réservations après la suppression
      });
    }
  }
}
