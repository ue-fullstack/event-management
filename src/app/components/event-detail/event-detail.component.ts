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
  event?: Event;
  eventForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router
    
  ) {
    this.eventForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('eventId');
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
      const id = this.route.snapshot.paramMap.get('eventId');
      if (id) {
        this.eventService.updateEvent(id, this.eventForm.value).subscribe(() => {
          alert("Event updated with sucess!");
          this.router.navigate(['/events']);
        });
      } else {
        console.error('ID de l\'événement est null');
      }
    }
  }


  dissociateArtistToEvent(artistId : string) {
    const selectedEventId = this.route.snapshot.paramMap.get('eventId');
    if (selectedEventId && artistId) {
      this.eventService
      .removeArtistFromEvent(selectedEventId, artistId)
      .subscribe({
        next: () => {
          alert('Artiste dissocié à l’événement avec succès !');
          this.router.navigate(['/events']);
        },
        error: (err) =>{
          alert(`Erreur : ${err.message}`)
        } 
      });
    } else {
      alert('Veuillez sélectionner un artiste et un événement.');
    }
  }
  
}
