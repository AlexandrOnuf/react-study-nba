import { EditorState } from 'draft-js';
import { FormFieldInputProps, FormFieldSelectProps } from 'interfaces'; // tslint:disable-line


export default interface DashboardState {
  editorState: EditorState;
  formData: {
    author: FormFieldInputProps;
    body: {
      element: string;
      valid: boolean;
      value: string;
    };
    image: {
      element: string;
      valid: boolean;
      value: string;
    };
    team: FormFieldSelectProps;
    title: FormFieldInputProps;
  };
  loading: boolean;
  postError: string;
}