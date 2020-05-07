export class User {
  id: number;
  name?: string;
  dateCreated?: string;
  twitchLink?: string;
  youtubeLink?: string;
  nicoLink?: string;
  twitterLink?: string;
  bio?: string;
  email?: string;
  isAdmin?: boolean;
  token?: string;

  selected_badge?: number;

  canReport?: boolean;
  canSubmit?: boolean;
  canReview?: boolean;
  canScreenshot?: boolean;
  banned?: boolean;
}