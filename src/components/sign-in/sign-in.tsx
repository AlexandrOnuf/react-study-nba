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

  public updateForm = (element: HTMLElement): void => {
    window.console.log(element);
  };

  public render() {
    return (
      <div className='logContainer'>
        <form>
          <FormField 
            id={'email'}
            formData={this.state.formData.email}
            change={(element: HTMLElement) => this.updateForm}
          />
        </form>
      </div>
    )
  }
}
