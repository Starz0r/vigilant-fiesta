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

  permissions?: any; 
  banned?: boolean;
}