import axios from 'axios';
import * as React from 'react';

/* tslint:disable */
import { SliderTemplates } from 'components';
import { DB_HOST_URL } from 'config';
import { Article, NewsSliderProps } from 'interfaces';
/* tslint:enable */

interface NewsSliderState {
  news: Article[];
}

export default class NewsSlider extends React.Component<NewsSliderProps, {}> {

  public readonly state: NewsSliderState = {
    news: []
  }

  public componentWillMount() {
    axios.get(`${DB_HOST_URL}/articles?_start=${this.props.start}&_end=${this.props.end}`)
      .then( response => {
        this.setState({
          news: response.data
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
