import { Review } from './review';

export class Game {
  id?: number;
  name?: string;
  author?: string;
  url?: string;
  urlSpdrn?: string;
  collab?: number;
  dateCreated?: Date;

  rating?: number;
  difficulty?: number;

  ownerId?: number;
  ownerBio?: Review;
}