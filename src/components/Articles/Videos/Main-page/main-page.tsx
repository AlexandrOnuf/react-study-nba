import React from 'react';
import { VideosList } from 'components'; // tslint:disable-line

const VideosMain = () => {
  return (
    <div>
      <VideosList 
          type="card"
          title={false}
          loadmore={true}
          start={0}
          amount={6}
        />
    </div>
  );
};

export default VideosMain;