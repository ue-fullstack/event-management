import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-add-artist',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-artist.component.html',
  styleUrl: './add-artist.component.css'
})
export class AddArtistComponent {
  addArtistForm: FormGroup;

  constructor(private fb: FormBuilder, private artistService: ArtistService) {
    this.addArtistForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  addArtist() {
    if (this.addArtistForm.valid) {
      this.artistService.addArtist(this.addArtistForm.value).subscribe({
        next: () => alert('Artiste ajouté avec succès !'),
        error: (err) => alert(`Erreur : ${err.message}`)
      });
    } else {
      alert('Formulaire invalide.');
    }
  }
}
