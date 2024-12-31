import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiResponseArtist } from '../../models/artist.model';

@Component({
  selector: 'app-add-artist-to-event',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-artist-to-event.component.html',
  styleUrl: './add-artist-to-event.component.css'
})
export class AddArtistToEventComponent implements OnInit{
  artists: any[] = [];
  events: any[] = [];
  selectedEventId: string = '';
  selectedArtistId: string = '';
  page: number = 0;
  size: number = 3;

  constructor(private artistService: ArtistService, private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadArtists();
    this.loadEvents();
    this.route.paramMap.subscribe(params => {
      this.selectedEventId = params.get('eventId') || '';
    });
  }

  loadArtists(): void {
        this.artistService.getArtists(this.page, this.size).subscribe((data: ApiResponseArtist) => {
          this.artists = data.content;
        });
      }

  loadEvents(): void {
    this.eventService.getEvents(this.page, this.size).subscribe(data => {
      this.events = data.content;
    });
  }

  associateArtistToEvent(): void {
    if (this.selectedEventId && this.selectedArtistId) {
      this.eventService.addArtistToEvent(this.selectedEventId, this.selectedArtistId).subscribe({
        next: () => alert('Artiste associé à l’événement avec succès !'),
        error: (err) => alert(`Erreur : ${err.message}`)
      });
    } else {
      alert('Veuillez sélectionner un artiste et un événement.');
    }
  }
}
