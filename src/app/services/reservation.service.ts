import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any[]> {
    console.log(this.http.get<any[]>(`${this.baseUrl}`));

    return this.http.get<any[]>(`${this.baseUrl}`);
  }


  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, reservation);
  }

  deleteReservation(reservationId: number): Observable<void> {
    const url = `${this.baseUrl}/${reservationId}`;
    return this.http.delete<void>(url);
  }

  getReservationsByUser(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<any[]>(url);
  }

  getReservationsBySession(sessionId: number): Observable<any[]> {
    const url = `${this.baseUrl}/session/${sessionId}`;
    return this.http.get<any[]>(url);
  }
}
