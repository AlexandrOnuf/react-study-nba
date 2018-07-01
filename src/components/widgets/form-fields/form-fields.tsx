import React from 'react';
import './form-fields.css';

import { FormFieldInputProps } from 'interfaces'; // tslint:disable-line

interface Props {
  formData: FormFieldInputProps;
  change: (element: {event: any; id:string; blur:boolean}) => void;
  id: string;
}


const FormField = ({formData, change, id}: Props) => {

  const renderTemplate = (): JSX.Element => {
    let formTemlate = (<div/>);

    switch(formData.element) {
      case 'input':
        formTemlate = (
          <div>
            <input 
              {...formData.config}
              value={formData.value}
              onBlur={(event) => change({event, id, blur:true})}
              onChange={(event) => change({event, id, blur:false})}
            />
          </div>
        );
        break;
      default: ;
    }

    return formTemlate;
  };

  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

export default FormField;