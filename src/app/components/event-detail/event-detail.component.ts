import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event.model';


@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  event?: Event;
  eventForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEvent(id).subscribe(data => {
        this.event = data;
        this.eventForm.patchValue(data);
      });
    } else {
      console.error('ID de l\'événement est null');
    }
  }

  updateEvent(): void {
    if (this.eventForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.eventService.updateEvent(id, this.eventForm.value).subscribe(() => {
          // Handle success
        });
      } else {
        console.error('ID de l\'événement est null');
      }
    }
  }
}
