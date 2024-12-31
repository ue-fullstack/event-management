import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.events = [
      {
        id: '1',
        label: 'Concert 1',
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        artists: [
          { name: 'Artist 1' },
          { name: 'Artist 2' }
        ]
      },
      {
        id: '2',
        label: 'Concert 2',
        startDate: '2024-02-01',
        endDate: '2024-02-02',
        artists: [
          { name: 'Artist 3' },
          { name: 'Artist 4' }
        ]
      },
      // Ajout d'un événement par défaut
      {
        id: 'default',
        label: 'Default Event',
        startDate: '2024-01-15',
        endDate: '2024-01-16',
        artists: [
          { name: 'Default Artist 1' },
          { name: 'Default Artist 2' }
        ]
      }
    ];
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEvents();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadEvents();
  }
}
