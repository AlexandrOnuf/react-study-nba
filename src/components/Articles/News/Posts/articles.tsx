import * as React from 'react'

import { firebase, firebaseDB, firebaseLooper, firebaseTeams } from 'firebase-config'; // tslint:disable-line
import { Article, NewsArticleProps, NewsArticleState, Team } from 'interfaces'; // tslint:disable-line
import '../../articles.css';

import Header from './header';


export default class NewsArticle extends React.Component<NewsArticleProps> {

  public readonly state: NewsArticleState = {
    article: null,
    imageURL: '',
    team: null
  }

  public componentWillMount() {
    firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const article: Article = snapshot.val();

        firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
          .then((snapshot: firebase.database.DataSnapshot) => { // tslint:disable-line
            const team: Team = firebaseLooper(snapshot)[0] ? firebaseLooper(snapshot)[0] : null;
            this.setState({
              article, team
            });

            if (article.image) {
              this.getImageURL(article.image);
            }
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
                background: `url('${this.state.imageURL}')`
              }} />
              <div className='articleText'
                dangerouslySetInnerHTML={{__html: article.body}}
              />
            </div>
          </div>) 
        } 
      </div>
    )
  }


  protected getImageURL = (filename: string) => {
    firebase.storage().ref('images')
      .child(filename).getDownloadURL()
      .then((url: string) => {
        this.setState({
          imageURL: url
        });
      })
  }
}
