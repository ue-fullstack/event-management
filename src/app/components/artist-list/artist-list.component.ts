import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiResponseArtist, Artist } from '../../models/artist.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-artist-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit {
  artists: any[] = []; // Liste complète des artistes
  displayedArtists: any[] = []; // Liste filtrée et paginée
  searchTerm: string = ''; // Texte de recherche
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 10; // Nombre d'éléments par page
  totalPages: number = 1; // Nombre total de pages

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService.getArtists(this.currentPage, this.itemsPerPage).subscribe((data) => {
      // Ajout d'artistes fictifs
      this.artists = [
        {
          id: 1,
          name: 'John Doe',
          events: ['Concert Paris', 'Festival Lyon', 'Exposition Bordeaux']
        },
        {
          id: 2,
          name: 'Jane Smith',
          events: ['Conférence Marseille', 'Festival Nice']
        },
        {
          id: 3,
          name: 'Mike Johnson',
          events: [] // Aucun événement
        }
      ];
      this.calculatePagination();
    });
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.artists.length / this.itemsPerPage);
    this.updateDisplayedArtists();
  }

  updateDisplayedArtists(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedArtists = this.artists
      .filter((artist) =>
        artist.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .slice(startIndex, startIndex + this.itemsPerPage);
  }

  filterArtists(): void {
    this.currentPage = 1;
    this.calculatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedArtists();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedArtists();
    }
  }
}
