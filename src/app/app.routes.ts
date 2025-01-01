import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import {HomeComponent} from './components/home/home.component';
import { AddArtistToEventComponent } from './components/add-artist-to-event/add-artist-to-event.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';

export const routes: Routes = [
    { path: 'events', component: EventListComponent },
    { path: 'events/:eventId', component: EventDetailComponent },
    { path: 'artists', component: ArtistListComponent },
    { path: 'associerArtist/:eventId', component: AddArtistToEventComponent },
    { path: 'artists/:artistId', component: ArtistDetailComponent },
    { path: 'addEvent', component: AddEventComponent},
    { path: 'addArtist', component: AddArtistComponent },
    { path: '', component: HomeComponent }
    // { path: '', redirectTo: '/events', pathMatch: 'full' },
];
