import React from 'react';
import './form-fields.css';


const FormField = ({formData, change, id}: any) => {

  const renderTemplate = (): JSX.Element => {
    let formTemlate = (<div/>);

    switch(formData.element) {
      case 'input':
        formTemlate = (
          <div>
            <input 
              {...formData.config}
              value={formData.value}
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