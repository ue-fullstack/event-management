import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EventService } from '../../services/event.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event.model';


@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  eventForm: FormGroup;
  event: any;
  newArtistName: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form
    this.eventForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required, this.futureDateValidator]],
      endDate: ['', [Validators.required, this.endDateValidator]]
    });
  }

  ngOnInit(): void {
    // Fetch event details based on ID (here hardcoded for example)
    const eventId = this.route.snapshot.paramMap.get('id');
    this.fetchEventDetails(eventId);

    // Pre-fill the form with event details (e.g., fetched data)
    if (this.event) {
      this.eventForm.patchValue({
        label: this.event.name,
        startDate: this.event.startDate,
        endDate: this.event.endDate
      });
    }
  }

  // Fetch event details (this would normally be from a service or API)
  fetchEventDetails(eventId: string | null) {
    // Example event data
    this.event = {
      id: eventId,
      name: 'Sample Event',
      startDate: '2024-12-31',
      endDate: '2025-01-02',
      artists: [{ name: 'John Doe' }, { name: 'Jane Smith' }]
    };
  }

  // Validator to ensure the start date is in the future
  futureDateValidator(control: any) {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate <= currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  // Validator to ensure the end date is after the start date
  endDateValidator(control: any) {
    const startDate = this.eventForm.get('startDate')?.value;
    if (new Date(control.value) <= new Date(startDate)) {
      return { invalidEndDate: true };
    }
    return null;
  }

  // Handle form submission
  updateEvent() {
    if (this.eventForm.valid) {
      const updatedEvent = this.eventForm.value;
      // Call service to update event details (mocking here)
      console.log('Event updated:', updatedEvent);
    }
  }

  // Add an artist to the event
  addArtistToEvent() {
    if (this.newArtistName.trim()) {
      this.event.artists.push({ name: this.newArtistName });
      this.newArtistName = ''; // Clear input after adding
    }
  }

  // Remove an artist from the event
  removeArtistFromEvent(artist: any) {
    // this.event.artists = this.event.artists.filter(a => a !== artist);
  }
}
