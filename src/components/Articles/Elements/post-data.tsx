import * as React from 'react';

interface Props {
  data: {
    author: string;
    date: Date | string;
  }
}

const postData = (props: Props) => (
  <div className='articlePostData'>
    <div>
      Date: <strong>{props.data.date}</strong>
    </div>
    <div>
      Author: <strong>{props.data.author}</strong>
    </div>
  </div>
);

export default postData;
