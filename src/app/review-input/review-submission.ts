import { Tag } from '../model/tag';
import { Review } from '../model/review';

export class ReviewSubmission {
    review: Review;
    tags: Tag[];
}