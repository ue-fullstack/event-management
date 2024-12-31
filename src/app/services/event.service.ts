import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Artist, Event } from '../models/event.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {}

  getEvents(page: number, size: number): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}?page=${page}&size=${size}`)
      .pipe(catchError(this.handleError));
  }

  getEvent(id: string): Observable<Event> {
    return this.http
      .get<Event>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateEvent(id: string, event: Event): Observable<Event> {
    return this.http
      .put<Event>(`${this.apiUrl}/${id}`, event)
      .pipe(catchError(this.handleError));
  }

  addArtistToEvent(eventId: string, artistId: string): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/${eventId}/artists/${artistId}`, {})
      .pipe(catchError(this.handleError));
  }

  removeArtistFromEvent(eventId: string, artistId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${eventId}/artists/${artistId}`)
      .pipe(catchError(this.handleError));
  }

  addEvent(event: Event): Observable<Event> {
    return this.http
      .post<Event>(this.apiUrl, event)
      .pipe(catchError(this.handleError));
  }

  deleteEvent(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('EventService Error:', error);
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
}
