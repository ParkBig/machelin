export interface UserInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  role: 'ADMIN' | 'USER';
  mobile: string;
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
