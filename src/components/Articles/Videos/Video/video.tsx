import axios from 'axios'
import * as React from 'react';

import { VideosRelated } from 'components';  // tslint:disable-line
import { DB_HOST_URL } from 'config'; // tslint:disable-line
import { NewsArticleProps, Team, Video } from 'interfaces'; // tslint:disable-line

import '../../articles.css';
import Header from './header';


interface VideoArticleState {
  article: Video | null;
  team: Team | null;
  teams?: Team[];
  related?: Video[];
}


export default class VideoArticle extends React.Component<NewsArticleProps> {
  public readonly state: VideoArticleState = {
    article: null,
    team: null
  }

  public componentWillMount() {
    axios.get(`${DB_HOST_URL}/videos?id=${this.props.match.params.id}`)
      .then( response => {
        const articleData = response.data[0];

        axios.get(`${DB_HOST_URL}/teams?id=${articleData.team}`)
          .then( response => {  // tslint:disable-line
            this.setState({
              article: articleData,
              team: response.data[0]
            });
            this.getRelated();
          })

      })
  }

  public getRelated() {
    if (this.state.team) {
      axios.get(`${DB_HOST_URL}/teams`)
        .then( response => {
          const teams: Team[] = response.data;

          axios.get(`${DB_HOST_URL}/videos?q=${this.state.team!.city}&_limit=3`)
            .then( response1  => {
              this.setState({
                related: response1.data,
                teams
              });
              // window.console.log(this.state)
            })

        })
    }
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
            <div className='videoWrapper'>
              <h1>{article.title}</h1>
              <iframe
                title='videoplayer'
                width='100%'
                height='300px'
                src={`https://www.youtube.com/embed/${article.url}`}
              />                
            </div>
            {this.state.related && this.state.related.length && this.state.teams && (
              <VideosRelated 
              related={this.state.related}
              teams={this.state.teams}  
            />
            )}
          </div>) 
        } 
      </div>
    )
  }
};
