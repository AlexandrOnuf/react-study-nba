import moment from "moment";
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
      Date: <strong>{moment(props.data.date).format(' MM-DD-YYYY')}</strong>
    </div>
    <div>
      Author: <strong>{props.data.author}</strong>
    </div>
  </div>
);

export default postData;
