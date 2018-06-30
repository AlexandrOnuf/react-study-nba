enum InputType {
  button = 'button',	// Defines a clickable button (mostly used with a JavaScript to activate a script)
  checkbox = 'checkbox',	// Defines a checkbox
  color = 'color',	// Defines a color picker
  date = 'date',	// Defines a date control (year, month, day (no time))
  datetime_local = 'datetime-local',	// Defines a date and time control (year, month, day, time (no timezone)
  email = 'email',	// Defines a field for an e-mail address
  file = 'file',	// Defines a file-select field and a "Browse" button (for file uploads)
  hidden = 'hidden',	// Defines a hidden input field
  image	= 'image', // Defines an image as the submit button
  month = 'month',	// Defines a month and year control (no timezone)
  number = 'number',	// Defines a field for entering a number
  password = 'password',	// Defines a password field
  radio = 'radio',	// Defines a radio button
  range = 'range',	// Defines a range control (like a slider control)
  reset = 'reset',	// Defines a reset button
  search = 'search',	// Defines a text field for entering a search string
  submit = 'submit',	// Defines a submit button
  tel = 'tel',	// Defines a field for entering a telephone number
  text = 'text',	// Default. Defines a single-line text field
  time = 'time',	// Defines a control for entering a time (no timezone)
  url = 'url',	// Defines a field for entering a URL
  week = 'week'
}


export default interface FormFieldInputProps {
  config: {
    name: string;
    placeholder: string;
    type: keyof typeof InputType;
  },
  element: string;
  touched: boolean;
  valid: boolean;
  validation: {};
  validationMessage: string;
  value: string;
}
