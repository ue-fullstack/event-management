import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ApiResponseArtist, Artist } from '../../models/artist.model';
import { ArtistService } from '../../services/artist.service';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  addEventForm: FormGroup;
  labelExists: boolean = false;
  page: number = 0;
  size: number = 10;


  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.addEventForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required, this.dateNotInPastValidator]],
      endDate: ['', Validators.required],
      artists: this.fb.array([])
    }, { validator: this.dateRangeValidator });
  }

  ngOnInit() {
    this.addEventForm.get('label')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(label => label && label.length >= 3 ? this.eventService.checkEventExists(label) : of(false))
    ).subscribe(exists => {
      this.labelExists = exists;
      if (exists) {
        this.addEventForm.get('label')?.setErrors({ 'exists': true });
      } else {
        this.addEventForm.get('label')?.setErrors(null);
        this.addEventForm.get('label')?.updateValueAndValidity();
      }
    });
  }


  checkLabelExists(label: string): Observable<boolean> {
    return this.eventService.checkEventExists(label);
  }


  dateRangeValidator(fg: FormGroup) {
    const start = fg.get('startDate')?.value;
    const end = fg.get('endDate')?.value;
    if (start && end && new Date(start) >= new Date(end)) {
      return { dateRange: true };
    }
    return null;
  }

  dateNotInPastValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (inputDate < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  addEvent() {
    if (this.addEventForm.valid && !this.labelExists) {
      this.eventService.addEvent(this.addEventForm.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Événement ajouté avec succès !',
            confirmButtonText: 'OK'
          }).then(() => {
            this.resetForm();
            this.router.navigate(['/events']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: err.status === 409 ? 'Cet événement existe déjà.' : `Erreur : ${err.message}`,
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Formulaire invalide ou événement déjà existant.',
        confirmButtonText: 'OK'
      });
    }
  }

  resetForm() {
    this.addEventForm.reset();
    this.labelExists = false;
    Object.keys(this.addEventForm.controls).forEach(key => {
      const control = this.addEventForm.get(key);
      control?.setErrors(null);
    });
  }

}
