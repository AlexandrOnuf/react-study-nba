import * as React from 'react';
const { Component } = React;
import './sign-in.css';
// tslint:disable
import { FormField } from 'components';
import { FormFieldInputProps, InputType } from 'interfaces';
// tslint:enable

// const INPUT_TYPES_ARRAY = Object.keys(InputType);
interface SignInState<K extends string> {
  formData: {
    [P in K]: FormFieldInputProps;
  };
  loading: boolean;
  registerError: string;
}

export default class SignIn extends Component {
  public readonly state: SignInState<'email'|'password'> = {
    formData: {
      email: {
        config: {
          name: 'email_input',
          placeholder: 'Enter your email',
          type: 'text',
        },
        element: 'input',
        touched: false,
        valid: false,
        validation: {
          email: true,
          required: true,
        },
        validationMessage: '',
        value: '',
      },
      password: {
        config: {
          name: 'password_input',
          placeholder: 'Enter your password',
          type: 'password',
        },
        element: 'input',
        touched: false,
        valid: false,
        validation: {
          password: true,
          required: true,
        },
        validationMessage: '',
        value: '',
      }
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
      const validData = this.validate(newElement)
    }

    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData
    });
  };

  public validate = (element: FormFieldInputProps) => {
    let error = [true, ''];

    if(element.validation.required) {
      const valid = element.value.trim() ? true : false;
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  }

  public render() {
    return (
      <div className='logContainer'>
        <form>
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
        </form>
      </div>
    )
  }
}
