import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponseArtist, Artist } from '../models/artist.model';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:8080/artists';

  constructor(private http: HttpClient) {}

  getArtists(page: number, size: number): Observable<ApiResponseArtist> {
    return this.http
      .get<ApiResponseArtist>(`${this.apiUrl}?page=${page}&size=${size}`)
      .pipe(catchError(this.handleError));
  }

  getArtist(id: string): Observable<Artist> {
    return this.http
      .get<Artist>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  loadArtists(): Observable<Artist[]> {
    return this.http
      .get<Artist[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  updateArtist(id: string, artist: Artist): Observable<Artist> {
    return this.http
      .put<Artist>(`${this.apiUrl}/${id}`, artist)
      .pipe(catchError(this.handleError));
  }

  addArtist(artist: Artist): Observable<Artist> {
    return this.http
      .post<Artist>(this.apiUrl, artist)
      .pipe(catchError(this.handleError));
  }

  removeEventFromArtist(artistId: string, eventId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${artistId}/events/${eventId}`)
      .pipe(catchError(this.handleError));
  }

  deleteArtist(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getEventForSpecificArtist(artistId: string): Observable<Event[]> {
    return this.http
      .get<Event[]>(`${this.apiUrl}/${artistId}/events`)
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
