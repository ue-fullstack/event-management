import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiResponseArtist } from '../../models/artist.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-artist-to-event',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-artist-to-event.component.html',
  styleUrl: './add-artist-to-event.component.css',
})
export class AddArtistToEventComponent implements OnInit {
  artists: any[] = [];
  events: any[] = [];
  selectedEventId: string = '';
  selectedArtistId: string = '';
  page: number = 0;
  size: number = 3;

  constructor(
    private artistService: ArtistService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArtists();
    this.loadEvents();
    this.route.paramMap.subscribe((params) => {
      this.selectedEventId = params.get('eventId') || '';
    });
  }

  loadArtists(): void {
    this.artistService
      .getArtists(this.page, this.size)
      .subscribe((data: ApiResponseArtist) => {
        this.artists = data.content;
      });
  }

  loadEvents(): void {
    this.eventService.getEvents(this.page, this.size).subscribe((data) => {
      this.events = data.content;
    });
  }

  associateArtistToEvent(): void {
    if (this.selectedEventId && this.selectedArtistId) {
      this.eventService
        .addArtistToEvent(this.selectedEventId, this.selectedArtistId)
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Artiste associé à l\'événement avec succès !',
              confirmButtonText: 'OK',
            }).then(() => {
              this.router.navigate(['/events', this.selectedEventId]);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: `Erreur : ${err.message}`,
              confirmButtonText: 'OK',
            });
          },
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Veuillez sélectionner un artiste et un événement.',
        confirmButtonText: 'OK',
      });
    }
  }
}
