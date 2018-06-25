import { Article } from '../../interfaces';

export default interface NewsListProps {
  type: string;
  loadmore: boolean;
  start?: number;
  amount?: number;
}

export interface NewsListState {
  amount: number;
  end: number;
  items: Article[];
  start: number;
}
