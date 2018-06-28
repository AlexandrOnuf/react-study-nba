import * as React from 'react';

import { NewsList, NewsSlider, VideosList } from '../../components';


const Home= () => {
    return (
      <div>
        <NewsSlider 
          type='featured'
          start={0}
          end={3}
          settings={{
            dots: true
          }}
        />
        <NewsList 
          type="card"
          loadmore={true}
          start={3}
          amount={3}
        />
        <VideosList 
          type="card"
          title={true}
          loadmore={true}
          start={0}
          amount={3}
        />
      </div>
    )
}


export default Home;