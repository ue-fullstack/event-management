import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  page: number = 0;
  size: number = 3;
  totalPages: number = 0;
  route = inject(Router);

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents(this.page, this.size).subscribe(data => {
      this.events = data.content;
      this.totalPages = data.totalPages;
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadEvents();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadEvents();
    }
  }

  deleteEvent(id: string): void {
    if(confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe(
        () => {
          this.events = this.events.filter(event => event.id !== id);
          alert("Evénement supprimé!");
        },
        error => {
          console.error('Erreur lors de la suppression de l\'événement', error);
        }
      );
    }
  }

  onDetail(eventId: string) {
    this.route.navigate(['events', eventId]);
  }

  onAssocierArtist(eventId: string) {
    this.route.navigate(['associerArtist', eventId]);
  }

}