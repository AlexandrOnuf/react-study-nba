export default interface Article {
  id: number | string;
  team: number;
  title: string;
  image?: string;
  body: string;
  date: string | Date;
  author: string;
  tags?: string[]
}
