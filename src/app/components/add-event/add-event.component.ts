import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ApiResponseArtist, Artist } from '../../models/artist.model';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-add-event',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit{
  addEventForm: FormGroup;
  artists: Artist[] = [];
  selectedArtists: Artist[] = [];
  page: number = 0;
  size: number = 10;

  constructor(private fb: FormBuilder, private eventService: EventService, private artistService: ArtistService) {
    this.addEventForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      artists: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
        this.artistService.getArtists(this.page, this.size).subscribe((data: ApiResponseArtist) => {
          this.artists = data.content;
        });
      }

  addEvent() {
    if (this.addEventForm.valid) {
      this.eventService.addEvent(this.addEventForm.value).subscribe({
        next: () => alert('Événement ajouté avec succès !'),
        error: (err) => alert(`Erreur : ${err.message}`)
      });
    } else {
      alert('Formulaire invalide.');
    }
  }

  addArtist(artist: any) {
    const artistsControl = this.addEventForm.get('artists') as FormArray;
    if (!artistsControl.value.find((a: any) => a.id === artist.id)) {
      artistsControl.push(this.fb.group({
        id: artist.id,
        label: artist.label
      }));
    }
  }

  removeArtist(index: number) {
    const artistsControl = this.addEventForm.get('artists') as FormArray;
    artistsControl.removeAt(index);
  }

  get selectedArtistsArray(): FormArray {
    return this.addEventForm.get('artists') as FormArray;
  }

}
