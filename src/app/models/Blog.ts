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
  description: string;
  ingredients: string;
}
