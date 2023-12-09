import { IPost } from 'types/store/myInfoType';

export default function postRating(posts?: IPost[]) {
  if (!posts) {
    return { rating: 0, total: 0 };
  }

  let rating = 0;
  posts.forEach(post => (rating += post.rating));
  const total = posts.length;

  if (total === 0) {
    return { rating: 0, total };  
  }

  return { rating: rating / total, total };
}
