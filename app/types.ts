export interface Book {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string; // kan vara undefined
  link?: string;
  hoverText?: string;
}
