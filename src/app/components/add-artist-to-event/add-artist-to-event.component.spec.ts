import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtistToEventComponent } from './add-artist-to-event.component';

describe('AddArtistToEventComponent', () => {
  let component: AddArtistToEventComponent;
  let fixture: ComponentFixture<AddArtistToEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddArtistToEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArtistToEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
