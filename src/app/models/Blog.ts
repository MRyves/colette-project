export default interface Blog {
  readonly uid: string;
  readonly userId: string;
  imgUrl: string;
  timestamp: {
    toDate(): Date;
  };
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
