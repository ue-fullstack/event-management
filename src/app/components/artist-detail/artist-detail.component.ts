import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-detail',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css'
})
export class ArtistDetailComponent implements OnInit {
  artist?: Artist;
  artistForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private fb: FormBuilder
  ) {
    this.artistForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('artistId');
    if (id) {
      this.artistService.getArtist(id).subscribe(data => {
        this.artist = data;
        this.artistForm.patchValue(data);
      });
    } else {
      console.error('ID de l\'artiste est null');
    }
  }

  updateArtist(): void {
    if (this.artistForm.valid) {
      const id = this.route.snapshot.paramMap.get('artistId');
      if (id) {
        this.artistService.updateArtist(id, this.artistForm.value).subscribe(() => {
          alert("Mise ajout avec success!")
        });
      } else {
        console.error('ID de l\'artiste est null');
      }
    }
  }
}
