export interface GooglePlace {
  name: string;
  formatted_address: string;
  place_id: string;
  geometry: {
    location: Location;
    viewport: Viewport;
  };
  photos: Photo[];
  vicinity: string;

  address_components?: AddressComponent[];
  adr_address?: string;
  business_status?: string;
  curbside_pickup?: boolean;
  current_opening_hours?: OpeningHours;
  delivery?: boolean;
  dine_in?: boolean;
  editorial_summary?: PlaceEditorialSummary;
  formatted_phone_number?: string;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  international_phone_number?: string;
  opening_hours?: PlaceOpeningHours;
  plus_code?: PlusCode;
  price_level?: number;
  rating?: number;
  reservable?: boolean;
  reference?: string;
  reviews?: Review[];
  scope?: string;
  serves_beer?: boolean;
  serves_breakfast?: boolean;
  serves_brunch?: boolean;
  serves_dinner?: boolean;
  serves_lunch?: boolean;
  serves_wine?: boolean;
  takeout?: boolean;
  types?: string[];
  url?: string;
  user_ratings_total?: number;
  utc_offset?: number;
  wheelchair_accessible_entrance?: boolean;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}
interface Location {
  lat: number;
  lng: number;
}
export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
interface OpeningHours {
  open_now: boolean;
  periods: OpeningHoursPeriod[];
  weekday_text: string[];
}
export interface OpeningHoursPeriod {
  open: { day: number; time: string };
  close: { day: number; time: string };
}
interface PlaceEditorialSummary {
  language?: string;
  overview?: string;
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
  website?: string;
}
interface Viewport {
  northeast: Location;
  southwest: Location;
}
interface PlaceOpeningHours {
  open_now?: boolean;
  type?: string;
  weekday_text: string[];
}

export interface UserInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  role: 'ADMIN' | 'USER';
  mobile: string;
  loginId: string;
  email: string;
  password: string;
  nickname: string;
  pfp: string;
  rank: string;
  activityZone: string;
  preferFoods: string[];
  preferRestaurant: string;
  medalsEarned: string[];
  bookmarks: Bookmark[];

  // will remove
  follows: UserInfo[];
  followers: UserInfo[];
  posts: IPost[];
  likes: Like[];
  dislikes: Like[];
}

export interface Bookmark {
  id: number;
  createdAt: Date;
  restaurantId: string;
  lat: number;
  lng: number;
  restaurantName: string;
  images: string[];
  address: string;
  rating: number;
  totalRatings: number;
}

export interface Comment {
  id: number;
  createdAt: Date;
  comment: string;
  owner: UserInfo;
}

export interface Like {
  id: number;
  createdAt: Date;
  post: IPost;
}

export interface IPost {
  id: number;
  createdAt: Date;
  hasProblem: boolean;
  postType: 'post' | 'notice' | 'localAd' | 'allAd';
  hasRestaurantTag: boolean;
  restaurantLat: number;
  restaurantLng: number;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  images: string[];
  contents: string;
  hashtags: string[];
  rating: number;
  isPublic: boolean;
  likes: Like[];
  disLikes: Like[];
  report: number;
  comments: Comment[];
  owner: UserInfo;
}

export interface IStamp {
  id: number;
  createdAt: Date;
  title: string;
  content: string;
  lat: number;
  lng: number;
  images: string[];
  restaurantId: string | null;
  restaurantName: string | null;
  address: string | null;
}
