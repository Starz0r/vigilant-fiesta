export class Review {
  id: number;
  game_id: number;
  user_id: number;
  rating: number = -1;
  difficulty: number = -1;
  comment: number;
  date_created: Date;
  removed: number;
  user_name: string;
  game_name: string;
  selected_badge: number; //reviewer's selected badge

  like_count: number;
}