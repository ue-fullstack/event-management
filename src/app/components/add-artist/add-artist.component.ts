import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-artist',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-artist.component.html',
  styleUrl: './add-artist.component.css',
})
export class AddArtistComponent implements OnInit {
  addArtistForm: FormGroup;
  labelExists: boolean = false;

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    private router: Router
  ) {
    this.addArtistForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.addArtistForm.get('label')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(label => label && label.length >= 3 ? this.checkLabelExists(label) : of(false))
    ).subscribe(exists => {
      console.log('Label exists:', exists);
      this.labelExists = exists;
    });
  }


  checkLabelExists(label: string): Observable<boolean> {
    return this.artistService.checkArtistExists(label);
  }

  addArtist() {
    if (this.addArtistForm.valid && !this.labelExists) {
      this.artistService.addArtist(this.addArtistForm.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Artiste ajouté avec succès !',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/artists']);
          });
        },
        error: (err) => {
          if (err.status === 409) {
            Swal.fire({
              icon: 'warning',
              title: 'Attention',
              text: 'Cet artiste existe déjà.',
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: `Erreur : ${err.message}`,
              confirmButtonText: 'OK',
            });
          }
        },
      });
    } else if (this.labelExists) {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Cet artiste existe déjà.',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Formulaire invalide.',
        confirmButtonText: 'OK',
      });
    }
  }
}
