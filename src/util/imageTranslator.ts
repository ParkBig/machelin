import { Photo } from 'types/data/restaureant';

export default function imageTranslator(photos: Photo[] | undefined, representative?: boolean) {
  if (!photos) {
    return [];
  }

  if (representative) {
    return [
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[0].photo_reference}&key=${process.env.GOOGLE_KEY}`,
    ];
  }

  const images = photos.map(
    photo =>
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${process.env.GOOGLE_KEY}`
  );

  return images;
}
