import * as React from 'react';

/* tslint:disable */
import { SliderTemplates } from 'components';
import { Article, NewsSliderProps } from 'interfaces';
import { firebase, firebaseArticles, firebaseLooper } from 'firebase-config';
/* tslint:enable */

interface NewsSliderState {
  news: Article[];
}

export default class NewsSlider extends React.Component<NewsSliderProps, {}> {

  public readonly state: NewsSliderState = {
    news: []
  }

  public componentWillMount() {
    firebaseArticles.limitToFirst(3).once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const news: Article[] = firebaseLooper(snapshot);
        this.setState({
          news
        });
      })
  }
  
  public render() {
    return (
      <div>
        <SliderTemplates news={this.state.news} type={this.props.type}
                         start={this.props.start} end={this.props.end}
                         settings={this.props.settings}/>
      </div>
    )
  }
}
