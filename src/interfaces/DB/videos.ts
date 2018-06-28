export default interface Video {
  id: number;
  team?: number;
  title: string;
  image: string;
  url: string | URL;
  date: string | Date;
  author: string;
  tags?: string[];
}