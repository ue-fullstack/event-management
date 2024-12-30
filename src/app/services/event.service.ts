import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Event } from '../models/event.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient) { }

  getEvents(page: number, size: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}&size=${size}`).pipe(catchError(this.handleError));
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateEvent(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event).pipe(catchError(this.handleError));
  }

  addArtistToEvent(eventId: string, artistId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${eventId}/artists/${artistId}`, {}).pipe(catchError(this.handleError));
  }

  removeArtistFromEvent(eventId: string, artistId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}/artists/${artistId}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(`Error: ${error.message}`));
  }
}
