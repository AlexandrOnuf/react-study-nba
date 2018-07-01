import { FormFieldInputProps, FieldConfig } from 'interfaces'; // tslint:disable-line


export default class FormFieldInputModel implements FormFieldInputProps {

  public constructor(
    public config: FieldConfig,
    public validation: any,
    public element: string = 'input',
    public touched: boolean = false,
    public valid: boolean = false,
    public validationMessage: string = '',
    public value: string = '',
  ) { }

}
