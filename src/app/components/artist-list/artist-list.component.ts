import { Component, inject, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiResponseArtist, Artist } from '../../models/artist.model';
import { forkJoin } from 'rxjs';
import { Event } from '../../models/event.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  page: number = 0;
  size: number = 3;
  totalPages: number = 0;
  route = inject(Router);
  allArtists: (Artist & { showEvents?: boolean })[] = [];
  filteredArtists: (Artist & { showEvents?: boolean })[] = [];
  searchTerm: string = '';

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
    this.artistService.getArtists(this.page, this.size).subscribe((data: ApiResponseArtist) => {
      this.allArtists = data.content.map(artist => ({ ...artist, showEvents: false }));
      this.filteredArtists = [...this.allArtists];
      this.totalPages = data.totalPages;
    });
  }

  searchArtists(): void {
    this.filteredArtists = this.allArtists.filter(artist =>
      artist.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleEvents(artistId: string): void {
    const artist = this.filteredArtists.find(a => a.id === artistId);
    if (artist) {
      artist.showEvents = !artist.showEvents;
      if (artist.showEvents && !artist.events) {
        this.loadEventsForArtist(artist);
      }
    }
  }
  

  loadEventsForArtist(artist: Artist & { showEvents?: boolean }): void {
    this.artistService.getEventForSpecificArtist(artist.id).subscribe(
      events => {
        artist.events = events;
      },
      error => {
        console.error('Erreur lors du chargement des événements', error);
      }
    );
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadArtists();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadArtists();
    }
  }

  deleteArtist(id: string): void {
    if(confirm('Êtes-vous sûr de vouloir supprimer cet artiste ?')) {
      this.artistService.deleteArtist(id).subscribe(
        () => {
          this.allArtists = this.allArtists.filter(artist => artist.id !== id);
          this.filteredArtists = this.filteredArtists.filter(artist => artist.id !== id);
          alert("Artiste supprimé!");
        },
        error => {
          console.error('Erreur lors de la suppression de l\'artiste', error);
        }
      );
    }
  }
  

  onDetail(artistId: string) {
    this.route.navigate(['artists', artistId]);
  }
}
