import { NewsList, NewsSlider } from 'components'; // tslint:disable-line
import * as React from 'react';


const NewsMain = () => {
  return (
    <div>
      <NewsSlider  
        type='featured'
        start={0}
        end={3}
        settings={{
          dots: false
        }}
      />
      <NewsList 
          type="cardMain"
          loadmore={true}
          start={3}
          amount={5}
        />
    </div>
  );
};

export default NewsMain;