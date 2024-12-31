import { Component, inject, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiResponseArtist, Artist } from '../../models/artist.model';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-artist-list',
  imports: [CommonModule],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  route = inject(Router);
  selectedArtistEvents: Event[] = [];
  selectedArtistId: string | null = null;

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.loadArtists();
  }


  loadArtists(): void {
    this.artistService.getArtists(this.page, this.size).subscribe((data: ApiResponseArtist) => {
      this.artists = data.content;
      this.totalPages = data.totalPages;
    });
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
          this.artists = this.artists.filter(artist => artist.id !== id);
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

  showEvents(artistId: string): void {
    this.selectedArtistId = artistId;
    this.artistService.getEventForSpecificArtist(artistId).subscribe(
      events => {
        this.selectedArtistEvents = events;
      },
      error => {
        console.error('Erreur lors du chargement des événements', error);
      }
    );
  }
}
