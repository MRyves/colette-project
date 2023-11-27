export interface Comment {
  readonly uid: string;
  nickname: string;
  comment: string;
}

export type Comments = Comment[];
