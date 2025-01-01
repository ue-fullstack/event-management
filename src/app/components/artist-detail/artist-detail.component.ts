import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/artist.model';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-artist-detail',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css'
})
export class ArtistDetailComponent implements OnInit {
  artist?: Artist;
  artistForm: FormGroup;
  events : Event [] = [];
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.artistForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('artistId');
    if (id) {
      this.loadArtistDetails(id);
      this.loadArtistEvents(id);
    } else {
      console.error('ID de l\'artiste est null');
    }
  }
  
  loadArtistDetails(id: string): void {
    this.artistService.getArtist(id).subscribe(data => {
      this.artist = data;
      this.artistForm.patchValue(data);
    });
  }
  
  loadArtistEvents(id: string): void {
    this.artistService.getEventForSpecificArtist(id).subscribe(events => {
      this.events = events;
    });
  }
  

  updateArtist(): void {
    if (this.artistForm.valid) {
      const id = this.route.snapshot.paramMap.get('artistId');
      if (id) {
        this.artistService.updateArtist(id, this.artistForm.value).subscribe(() => {
          alert("Mise ajout avec success!"),
          this.router.navigate(['/artists']);
        });
      } else {
        console.error('ID de l\'artiste est null');
      }
    }
  }
}
