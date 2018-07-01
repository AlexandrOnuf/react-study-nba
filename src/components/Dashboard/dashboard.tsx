import * as React from 'react';

import { FormField, FormFieldInputModel } from 'components'; // tslint:disable-line
import { FormFieldInputProps } from 'interfaces'; // tslint:disable-line

import './dashboard.css';


export default class Dashboard extends React.Component<any, any> {
  public readonly state = {
    formData: {
      author: new FormFieldInputModel(
        { name:'author_input', placeholder:'Enter your name', type: 'text' },
        { required:true }
      ),
      title: new FormFieldInputModel(
        { name:'title_input', placeholder:'Enter the post title', type: 'text' },
        { required:true }
      ),
    },
    loading: false,
    postError: '',
  }

  public render() {
    return (
      <div className='postContainer'>
        <form onSubmit={this.submitForm}>
          <h2>Add post</h2>
          <FormField 
            id={'author'}
            formData={this.state.formData.author}
            change={(element: {event: any; id:string; blur:boolean}) => this.updateForm(element)}
          />
          <FormField 
            id={'title'}
            formData={this.state.formData.title}
            change={(element: {event: any; id:string; blur:boolean}) => this.updateForm(element)}
          />
          {this.renderSubmitButton()}
          {this.showErrorMessage()}
        </form>
      </div>
    )
  }

  protected renderSubmitButton = () => (
    this.state.loading ? 
      'loading...'
    :
      <div>
        <button type='submit'>Add Post</button>
      </div>
  ) 

  protected updateForm = (element: {event: any; id:string; blur:boolean}): void => {
    const newFormData = {
      ...this.state.formData
    };
    const newElement: FormFieldInputProps = {
      ...newFormData[element.id]
    };
    newElement.value = element.event.target.value;

    if(element.blur) {
      const validationResult = this.validate(newElement);
      newElement.valid = validationResult[0];
      newElement.validationMessage = validationResult[1];
    }
    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData
    });
  };

  protected submitForm(e: any) {
    e.preventDefault();

    const dataToSubmit: any = new Object();
    let formIsValid = true;

    for (const key in this.state.formData) {
      if (this.state.formData.hasOwnProperty(key)) {
        dataToSubmit[key] = this.state.formData[key].value;
        formIsValid = this.state.formData[key].valid && formIsValid;
      }
    }

    if (formIsValid) {
      this.setState({
        loading: true,
        postError: ''
      });
    } else {
      this.setState({
        postError: 'Something went wrong'
      });
    }
  } 

  protected showErrorMessage = (): JSX.Element => (
    this.state.postError !== '' ?
      <div className='error'>{this.state.postError}</div>
    :
      <span/>
  )

  protected validate = (element: FormFieldInputProps): [boolean, string] => {
    let error: [boolean, string] = [true, ''];

    if(element.validation.required) {
      const valid = element.value.trim() ? true : false;
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  }
 
}
