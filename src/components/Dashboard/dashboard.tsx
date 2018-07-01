import * as React from 'react';

import { FormField, FormFieldInputModel } from 'components'; // tslint:disable-line
import { InputType } from 'interfaces'; // tslint:disable-line

import './dashboard.css';


export default class Dashboard extends React.Component<any, any> {
  public readonly state = {
    formData: {
      author: new FormFieldInputModel(
        { name:'author_input', placeholder:'Enter your name', type: 'text' },
        { required:true }
      ),
      loading: false,
      postError: '',
    }
  }

  public render() {
    return (
      <div className='postContainer'>
        <form onSubmit={this.submitForm}>
          <h2>Add post</h2>
        </form>
      </div>
    )
  }

  
  protected submitForm() {
    return true
  } 
}
