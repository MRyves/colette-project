import { FieldValue, Timestamp } from '@firebase/firestore';

export default interface Blog {
  readonly uid: string;
  readonly userId: string;
  imgUrl: string;
  timestamp: FieldValue | Timestamp;
  title: string;
  author: string;
  lead: string;
  category: string;
  niveau: string;
  tags: string[];
  duration: string;
  description: string;
  ingredients: string[];
  avgRating?: number;
}
