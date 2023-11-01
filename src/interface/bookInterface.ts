export type IBook = {
  _id?: string;
  title: string;
  author: string;
  authorDetails: IAuthor;
  genre: string;
  publicationDate: Date;
  reviews: IReview[];
  wishList?: boolean;
  image?: string;
  file?: string;
  isFinished?: boolean;
};

export type IAuthor = {
  _id: string;
  name: string;
  email: string;
};

export type IReview = {
  user: string;
  comment: string;
};


export type TCreateBook = {
  title: string;
  genre: string;
  publicationDate: Date;
};
