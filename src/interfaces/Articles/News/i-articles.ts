import { RouteComponentProps } from 'react-router-dom';

import { Article, Team } from '../../../interfaces';


export interface NewsArticleState {
  article: Article | null;
  imageURL: string;
  team: Team | null;
}


interface MatchParams {
    id: number;
}

export interface NewsArticleProps extends RouteComponentProps<MatchParams> {
  m?: string
}

export interface ArticleHeaderProps {
  teamData: Team | null;
  date: Date | string;
  author: string;
}

// from typings
// export interface RouteComponentProps<P> {
//   match: match<P>;
//   location: H.Location;
//   history: H.History;
//   staticContext?: any;
// }

// export interface match<P> {
//   params: P;
//   isExact: boolean;
//   path: string;
//   url: string;
// }