// response ~ 로바꿔주고 Rest~에는 photos의 인터페이스 바꾸기
export type responseRestaurant = {
  business_status: string;
  geometry: {
    location: Location;
    viewport: Viewport;
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos?: Photo[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  price_level?: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
};
export type Restaurant = {
  business_status: string;
  geometry: {
    location: Location;
    viewport: Viewport;
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photo: string;
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  price_level?: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
};

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface GooglePlace {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: Location;
    viewport: Viewport;
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    periods: OpeningHoursPeriod[];
    weekday_text: string[];
  };
  photos: Photo[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  reviews: Review[];
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface OpeningHoursPeriod {
  open: { day: number; time: string };
  close: { day: number; time: string };
}

interface OpeningHours {
  open_now: boolean;
  periods: OpeningHoursPeriod[];
  weekday_text: string[];
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface DetailRestaurant {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  current_opening_hours: OpeningHours;
  dine_in: boolean;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: { lat: number; lng: number };
    viewport: { northeast: any; southwest: any };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  reservable: boolean;
  reviews: Review[];
  serves_beer: boolean;
  serves_brunch: boolean;
  serves_dinner: boolean;
  serves_lunch: boolean;
  serves_wine: boolean;
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
}
