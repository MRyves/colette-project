interface Comment {
  readonly uid: string;
  authorName: string;
  comment: string;
}

export type Comments = Array<Comment>;
