import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseArtist, Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private apiUrl = 'http://localhost:8080/artists';

  constructor(private http: HttpClient) { }

  getArtists(page: number, size: number): Observable<ApiResponseArtist> {
    return this.http.get<ApiResponseArtist>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`);
  }

  updateArtist(id: string, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/${id}`, artist);
  }

  addEventToArtist(artistId: string, eventId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${artistId}/events/${eventId}`, {});
  }

  removeEventFromArtist(artistId: string, eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${artistId}/events/${eventId}`);
  }
}
