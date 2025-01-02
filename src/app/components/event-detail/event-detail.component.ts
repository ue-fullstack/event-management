import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EventService } from '../../services/event.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event.model';
import Swal from 'sweetalert2';


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
        Swal.fire({
          title: 'Confirmer la mise à jour',
          text: 'Êtes-vous sûr de vouloir mettre à jour cet événement ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, mettre à jour',
          cancelButtonText: 'Annuler',
        }).then((result) => {
          if (result.isConfirmed) {
            this.eventService.updateEvent(id, this.eventForm.value).subscribe({
              next: () => {
                Swal.fire({
                  icon: 'success',
                  title: 'Mise à jour réussie',
                  text: 'L\'événement a été mis à jour avec succès.',
                  confirmButtonText: 'OK',
                }).then(() => {
                  this.router.navigate(['/events']);
                });
              },
              error: (err) => {
                console.error('Erreur lors de la mise à jour de l\'événement', err);
                Swal.fire({
                  icon: 'error',
                  title: 'Erreur',
                  text: `Une erreur est survenue : ${err.message}`,
                  confirmButtonText: 'OK',
                });
              },
            });
          }
        });
      } else {
        console.error('ID de l\'événement est null');
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de récupérer l\'ID de l\'événement.',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulaire invalide',
        text: 'Veuillez vérifier les champs du formulaire avant de soumettre.',
        confirmButtonText: 'OK',
      });
    }
  }


  dissociateArtistToEvent(artistId: string): void {
    const selectedEventId = this.route.snapshot.paramMap.get('eventId');
    if (selectedEventId && artistId) {
      Swal.fire({
        title: 'Confirmer la dissociation',
        text: 'Êtes-vous sûr de vouloir dissocier cet artiste de l\'événement ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, dissocier',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.eventService.removeArtistFromEvent(selectedEventId, artistId).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'L\'artiste a été dissocié de l\'événement avec succès.',
                confirmButtonText: 'OK',
              }).then(() => {
                this.router.navigate(['/events']);
              });
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: `Une erreur est survenue : ${err.message}`,
                confirmButtonText: 'OK',
              });
            },
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Données manquantes',
        text: 'Veuillez sélectionner un artiste et un événement.',
        confirmButtonText: 'OK',
      });
    }
  }

}
