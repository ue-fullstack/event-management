export interface Sort {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }
  
  export interface Pageable {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: Sort[];
    unpaged: boolean;
  }
  
  export interface Artist {
    id: string;
    label: string;
  }
  
  export interface Event {
    id: string;
    label: string;
    startDate: string;
    endDate: string;
    artists: Artist[];
  }
  
  export interface ApiResponse {
    totalElements: number;
    totalPages: number;
    pageable: Pageable;
    first: boolean;
    last: boolean;
    size: number;
    content: Event[];
    number: number;
    sort: Sort[];
    numberOfElements: number;
    empty: boolean;
  }
  