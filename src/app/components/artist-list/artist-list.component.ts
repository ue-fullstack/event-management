import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiResponseArtist, Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;

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
}
