import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private baseUrl = 'http://localhost:8080/api/sessions';

  constructor(private http: HttpClient) { }

  getSessions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createSession(session: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, session);
  }

  deleteSession(sessionId: number): Observable<void> {
    const url = `${this.baseUrl}/${sessionId}`;
    return this.http.delete<void>(url);
  }

  getSessionReservations(sessionId: number): Observable<any[]> {
    const url = `${this.baseUrl}/${sessionId}/reservations`;
    return this.http.get<any[]>(url);
  }

  // Ajoutez d'autres méthodes au besoin, comme la mise à jour d'une session, etc.
}
