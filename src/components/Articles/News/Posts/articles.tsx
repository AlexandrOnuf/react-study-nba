import axios from 'axios';
import * as React from 'react'

import { DB_HOST_URL } from '../../../../config';
import { NewsArticleProps, NewsArticleState } from '../../../../interfaces';
import '../../articles.css';

import Header from './header';


export default class NewsArticle extends React.Component<NewsArticleProps> {

  public readonly state: NewsArticleState = {
    article: null,
    teams: []
  }

  public componentWillMount() {
    axios.get(`${DB_HOST_URL}/articles?id=${this.props.match.params.id}`)
      .then( response => {
        const articleData = response.data[0];

        axios.get(`${DB_HOST_URL}/teams?id=${articleData.team}`)
          .then( response => {  // tslint:disable-line
            this.setState({
              article: articleData,
              teams: response.data
            })
          })

      })
  }

  public render() {
    const article = this.state.article;
    const teams = this.state.teams;

    return (
      <div>
        { article && (
          <div> 
            <Header 
              teamData={teams[0]}
              date={article.date}
              author={article.author}
            />
            <div className='articleBody'>
              <h1>{article.title}</h1>
              <div className='articleImage' style={{
                background: `url(/images/articles/${article.image})`
              }} />
              <div className='articleText'>
                {article.body}
              </div>
            </div>
          </div>) 
        } 
      </div>
    )
  }
}
