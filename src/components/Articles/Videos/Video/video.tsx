import * as React from 'react';

import { VideosRelated } from 'components';  // tslint:disable-line
import { firebase, firebaseDB, firebaseLooper, firebaseVideos, firebaseTeams } from 'firebase-config'; // tslint:disable-line
import { NewsArticleProps, Team, Video } from 'interfaces'; // tslint:disable-line

import '../../articles.css';
import Header from './header';


interface VideoArticleState {
  videoArticle: Video | null;
  team: Team | null;
  teams?: Team[];
  related?: Video[];
}


export default class VideoArticle extends React.Component<NewsArticleProps> {
  public readonly state: VideoArticleState = {
    team: null,
    videoArticle: null
  }

  public componentWillMount() {
    firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const videoArticle: Video = snapshot.val();

        if (videoArticle && videoArticle.team) {
          firebaseTeams.orderByChild('teamId').equalTo(videoArticle.team).once('value')
          .then((snapshot: firebase.database.DataSnapshot) => { // tslint:disable-line
            const team: Team = firebaseLooper(snapshot)[0] ? firebaseLooper(snapshot)[0] : null;
            this.setState({
              team, videoArticle
            });
            this.getRelated();
          })
        }
      })
  }

  public getRelated() {
    if (this.state.team) {
      firebaseTeams.once('value')
        .then( (snapshot: firebase.database.DataSnapshot) => {
          const teams: Team[] = firebaseLooper(snapshot);

          firebaseVideos.orderByChild('team').equalTo(this.state.team!.teamId).limitToFirst(3).once('value')
            .then((snapshot: firebase.database.DataSnapshot) => { // tslint:disable-line
              this.setState({
                related: firebaseLooper(snapshot),
                teams
              });
            })
        })
    }
  }

  public render() {
    const videoArticle = this.state.videoArticle;
    const team = this.state.team;

    return (
       <div>
        { videoArticle && (
          <div> 
            <Header 
              teamData={team}
              date={videoArticle.date}
              author={videoArticle.author}
            />
            <div className='videoWrapper'>
              <h1>{videoArticle.title}</h1>
              <iframe
                title='videoplayer'
                width='100%'
                height='300px'
                src={`https://www.youtube.com/embed/${videoArticle.url}`}
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
