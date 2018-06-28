import axios from 'axios';
import * as React from 'react'

import { DB_HOST_URL } from 'config'; // tslint:disable-line
import { NewsArticleProps, NewsArticleState } from 'interfaces'; // tslint:disable-line
import '../../articles.css';

import Header from './header';


export default class NewsArticle extends React.Component<NewsArticleProps> {

  public readonly state: NewsArticleState = {
    article: null,
    team: null
  }

  public componentWillMount() {
    axios.get(`${DB_HOST_URL}/articles?id=${this.props.match.params.id}`)
      .then( response => {
        const articleData = response.data[0];

        axios.get(`${DB_HOST_URL}/teams?id=${articleData.team}`)
          .then( response => {  // tslint:disable-line
            this.setState({
              article: articleData,
              team: response.data[0]
            })
          })

      })
  }

  public render() {
    const article = this.state.article;
    const team = this.state.team;

    return (
      <div>
        { article && (
          <div> 
            <Header 
              teamData={team}
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
