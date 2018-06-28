import { Team, Video } from '../../interfaces';
import { AbstractListProps } from './abstract-list';

export interface VideosListProps extends AbstractListProps {
  type: string;
  title: boolean;
  loadmore: boolean;
  start?: number;
  amount?: number;
}

export interface VideosListState {
  amount: number;
  end: number;
  start: number;
  teams: Team[];
  videos: Video[];
}