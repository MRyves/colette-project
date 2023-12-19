import { FieldValue, Timestamp } from '@firebase/firestore';
import { Ingredient } from '../components/blog-form';

export default interface Blog {
  readonly uid: string;
  readonly userId: string;
  title: string;
  lead: string;
  category: string;
  duration: string;
  quantity: string;
  tags: string[];
  level: string;
  ingredients: Ingredient[];
  description: string;
  additional: string;

  imgUrl: string;
  timestamp: FieldValue | Timestamp;
  author: string;
  avgRating?: number;
}
