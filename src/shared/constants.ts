import { IBook } from "../interface/bookInterface";

export const bookEnum: string[] = [
  "mystery",
  "romance",
  "scienceFiction",
  "fantasy",
  "thriller",
  "historicalFiction",
  "biography",
  "selfHelp",
  "horror",
  "poetry",
];


export const initBook: IBook = {
  title: "",
  genre: "",
  publicationDate: new Date(),
  author: "",
  authorDetails: {
    _id: "",
    name: "",
    email: "",
  },
  reviews: [],
};