import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  allEvents: any[] = [];
  searchTerm: string = '';
  filteredEvents: any[] = [];
  currentPage: number = 0;
  size: number = 3;
  totalPages: number = 0;
  route = inject(Router);

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents(this.currentPage, this.size).subscribe(data => {
      this.allEvents = data.content;
      this.filteredEvents = [...this.allEvents];
      this.totalPages = data.totalPages;
    });
  }

  searchEvents(): void {
    this.filteredEvents = this.allEvents.filter(event =>
      event.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents();
    }
  }

  deleteEvent(id: string): void {
    if(confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe(
        () => {
          this.allEvents = this.allEvents.filter(event => event.id !== id);
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