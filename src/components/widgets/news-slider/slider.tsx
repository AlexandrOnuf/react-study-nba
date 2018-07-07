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
        /** Get news from DB  */
        const news: Article[] = firebaseLooper(snapshot);

        /** Function for get all images urls from DB  */
        const asyncFunc = (item: Article, i: number, callback: any) => {
          if (item.image) {
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then((url: string) => {
                  news[i].image = url;
                  callback();
                })
              }
        };

        /** Make requests to DB for get all images urls inside the Promises */
        const requests: Array<Promise<{}>> = news.map((item, i) => {
          return new Promise((resolve) => {
            asyncFunc(item, i, resolve)
          })
        });

        /** Wait when all requests for DB will be done and then refresh state of component */
        Promise.all(requests).then(() => {
          this.setState({
            news
          })
        })

        
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
