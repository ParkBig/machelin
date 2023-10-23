export interface MyInfo {
  bookmarks: string[]; 
  createdAt: string;
  email: string;
  follow: Follow[];
  followers: Follow[];
  id: number;
  nickName: string;
  password: string;
  pfp: string;
  posts: Post[];
  rank: string;
  role: 'ADMIN' | 'USER';
  updatedAt: string;
  verified: boolean;
}

export interface Bookmark {
  id: string;
  lat: number;
  lng: number;
  restaurantName: string;
  img: string;
  address: string;
  rating: number;
  totalUserRatings: number;
}

interface Follow {
  pfp: string;
  nickName: string;
}

interface Post {
  id: number;
  createdAt: Date;
  title: string;
  contents: string;
  photos: string[];
  likes: number;
  report: number;
  comments: {
    pfp: string;
    nickName: string;
    comment: string;
  }
}
