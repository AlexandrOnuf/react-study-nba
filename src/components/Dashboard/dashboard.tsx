import { ContentState, convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { FUploader, FormField, FormFieldInputModel } from 'components'; // tslint:disable-line
import { firebase, firebaseArticles, firebaseTeams } from 'firebase-config'; // tslint:disable-line
import { DashboardState, FormFieldInputProps, FormFieldSelectProps, Team, SelectFieldOptions } from 'interfaces'; // tslint:disable-line

import './dashboard.css';


export default class Dashboard extends React.Component<any, DashboardState> {
  public readonly state = {
    editorState: EditorState.createEmpty(),
    formData: {
      author: new FormFieldInputModel(
        { name:'author_input', placeholder:'Enter your name', type: 'text' },
        { required:true }
      ),
      body: {
        element: 'texteditor',
        valid: true,
        value: '',
      },
      image: {
        element: 'image',
        valid: true,
        value: '',
      },
      team: {
        config: {
          name: 'teams_input',
          options: new Array(),
        },
        element: 'select',
        touched: false,
        valid: false,
        validation: {
          required: true
        },
        validationMessage: '',
        value: -1,
      },
      title: new FormFieldInputModel(
        { name:'title_input', placeholder:'Enter the post title', type: 'text' },
        { required:true }
      ),
    },
    loading: false,
    postError: '',
  }

  public componentDidMount() {
    this.loadTeams();
  }

  public render() {
    return (
      <div className='postContainer'>
        <form onSubmit={this.submitForm}>
          <h2>Add post</h2>

          <FUploader 
            storeFilename={(filename: string) => this.storeFilename(filename)}
          />

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

          <Editor 
            editorState={this.state.editorState}
            wrapperClassName='myEditor-wrapper'
            editorClassName='myEditor-editor'
            onEditorStateChange={this.onEditorStateChange}
          />

          <FormField
            id={'team'}
            formData={this.state.formData.team}
            change={(element: {event: any; id:string; blur:boolean}) => this.updateForm(element)}
          />

          {this.renderSubmitButton()}
          {this.showErrorMessage()}
        </form>
      </div>
    )
  }


  protected loadTeams = () => {
    firebaseTeams.once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const teams: SelectFieldOptions[] = [];

        snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
          teams.push({
            id: childSnapshot.val().teamId,
            name: childSnapshot.val().city,
          });
        });
       
        const newFormData = {...this.state.formData};
        const newElement: FormFieldSelectProps = {...newFormData.team};

        newElement.config.options = teams;
        if (teams) {
          newElement.valid = true;
          newElement.value = parseInt(teams[0].id, 10)
        }
        newFormData.team = newElement;

        this.setState({
          formData: newFormData
        });
      })
  }

  protected onEditorStateChange = (editorState: EditorState) => {
    const contentState: ContentState = editorState.getCurrentContent();
    // const rawState: RawDraftContentState = convertToRaw(contentState); // предпочтительней чем stateToHTML на реальном проекте
    const html: string = stateToHTML(contentState)
    
    this.updateForm({id: 'body'}, html);
    
    this.setState({
      editorState
    });
  }

  protected renderSubmitButton = () => (
    this.state.loading ? 
      'loading...'
    :
      <div>
        <button type='submit'>Add Post</button>
      </div>
  ) 

  protected updateForm = (element: {event?: any; id:string; blur?:boolean}, content: string = ''): void => {
    const newFormData = {
      ...this.state.formData
    };
    const newElement: FormFieldInputProps|FormFieldSelectProps = {
      ...newFormData[element.id]
    };

    if (element.id === 'team') {  // tslint:disable-line
      newElement.value = parseInt(element.event.target.value, 10);
    } else {
      newElement.value = content.trim() || element.event === undefined ? content : element.event.target.value;
    }

    if(element.blur) {
      const validationResult = this.validate(newElement);
      newElement.valid = validationResult[0];
      newElement.validationMessage = validationResult[1];
    }
    if (element.blur !== undefined) {
      newElement.touched = element.blur;
    }
    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData
    });

  };

  protected storeFilename = (filename: string) => {
    this.updateForm({id: 'image'}, filename)
  }

  protected submitForm = (e: any) => {
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

      firebaseArticles.orderByChild('id')
        .limitToLast(1).once('value')
        .then( snapshot => {
          let articleId: number | null = null;
          snapshot.forEach(childSnapshot => {
            articleId = childSnapshot.val().id;
          });

          dataToSubmit.date = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit.id = articleId ? ++articleId : 0;

          firebaseArticles.push(dataToSubmit)
            .then(article => {
              this.props.history.push(`/articles/${article.key}`)
            })/* .catch( (error) => {
              this.setState({
                postError: error.message
              })  
            }) */

        })
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

  protected validate = (element: FormFieldInputProps|FormFieldSelectProps): [boolean, string] => {
    let error: [boolean, string] = [true, ''];

    if(element.validation.required) {
      if (typeof element.value === 'string') {
        element.value = element.value.trim();
      }
      const valid = element.value ? true : false;
      
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  }
 
}
