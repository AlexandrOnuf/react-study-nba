import * as EmailValidator from 'email-validator';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
const { Component } = React;

// tslint:disable
import { FormField, FormFieldInputModel } from 'components';
import { firebase } from 'firebase-config';
import { FormFieldInputProps } from 'interfaces';
// tslint:enable
import './sign-in.css';

// const INPUT_TYPES_ARRAY = Object.keys(InputType);
interface SignInState<K extends string> {
  formData: {
    [P in K]: FormFieldInputProps;
  };
  loading: boolean;
  registerError: string;
}

export default class SignIn extends Component<RouteComponentProps<any>> {
  public readonly state: SignInState<'email'|'password'> = {
    formData: {
      email: new FormFieldInputModel(
        { name: 'email_input', placeholder: 'Enter your email', type: 'email' },
        { email: true, required: true }
      ),
      password: new FormFieldInputModel(
        { name: 'password_input', placeholder: 'Enter your password', type: 'password' },
        { password: true, required: true }
      )
    },
    loading: false,
    registerError: '',
  }

  public updateForm = (element: {event: any; id:string; blur:boolean}): void => {
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

  public renderSubmitButton = () => (
    this.state.loading ? 
      'loading...'
    :
      <div>
        <button onClick={(event) => this.submitForm(event, false)}>Register now</button>
        <button onClick={(event) => this.submitForm(event, true)}>Log in</button>
      </div>
  ) 

  public submitForm = (event: any, type: boolean | null) => {
    event.preventDefault();
    if (type !== null) {
      const dataToSubmit: {email: string; password: string} = {email: '', password: ''};
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
          registerError: ''
        });
        if (type) {  // log in 
          firebase.auth().signInWithEmailAndPassword(
            dataToSubmit.email,
            dataToSubmit.password
          ).then(() => {
            this.props.history.push('/')
          }).catch(error => {
            this.setState({
              loading: false,
              registerError: error.message
            });
          })
        } else {  // register
          firebase.auth().createUserWithEmailAndPassword(
            dataToSubmit.email,
            dataToSubmit.password
          ).then(() => {
            this.props.history.push('/')
          }).catch(error => {
            this.setState({
              loading: false,
              registerError: error.message
            });
          })
        }
      }
    }
  }

  public showErrorMessage = (): JSX.Element => (
    this.state.registerError !== '' ?
      <div className='error'>{this.state.registerError}</div>
    :
      <span/>
  )

  public render() {
    return (
      <div className='logContainer'>
        <form onSubmit={(event) => this.submitForm(event, null)}>
          <h2>Register / Log in</h2>
          <FormField 
            id={'email'}
            formData={this.state.formData.email}
            change={(element: any) => this.updateForm(element)}
          />
          <FormField 
            id={'password'}
            formData={this.state.formData.password}
            change={(element: {event: any; id:string; blur:boolean}) => this.updateForm(element)}
          />
          {this.renderSubmitButton()}
          {this.showErrorMessage()}
        </form>
      </div>
    )
  }


  protected validate = (element: FormFieldInputProps): [boolean, string] => {
    let error: [boolean, string] = [true, ''];

    if(element.validation.email) {
      const valid = EmailValidator.validate(element.value.toLowerCase());
      const message = `${!valid ? 'There should be a valid email' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if(element.validation.password) {
      const valid = element.value.length >= 6;
      const message = `${!valid ? 'This must be greater then 5' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if(element.validation.required) {
      const valid = element.value.trim() ? true : false;
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  }
}
