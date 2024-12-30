import { Pageable, Sort } from "./event.model";

export interface Artist {
    id: string;
    label: string;
    genre: string;
    events: Event[];
  }
  
  export interface ApiResponseArtist {
    totalElements: number;
    totalPages: number;
    pageable: Pageable;
    first: boolean;
    last: boolean;
    size: number;
    content: Artist[];
    number: number;
    sort: Sort[];
    numberOfElements: number;
    empty: boolean;
  }
  