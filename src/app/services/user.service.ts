import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete<void>(url);
  }

  getUserReservations(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}/${userId}/reservations`;
    return this.http.get<any[]>(url);
  }

  // Ajoutez d'autres méthodes au besoin, comme la mise à jour d'un utilisateur, etc.
}
