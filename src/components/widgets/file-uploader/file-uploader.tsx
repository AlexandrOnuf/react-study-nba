import * as React from 'react';
import FileUploader from 'react-firebase-file-uploader';

import { firebase } from 'firebase-config'; //tslint:disable-line


export default class FUploader extends React.Component<any, any> {

  public readonly state = {
    fileURL: '',
    isUploading: false,
    name: '',
    progress: 0,
  }

  public render() {
    return (
      <div>
        <FileUploader
          accept='image/*' name='image'
          randomizeFilename={true}
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.hundleUploadStart}
          onUploadError={this.hundleUploadError}
          onUploadSuccess={this.hundleUploadSuccess}
          onProgress={this.hundleProgress}
        />
        { this.state.isUploading && <p>Progress: {this.state.progress}</p> }
        { this.state.fileURL && <img src={this.state.fileURL} style={{ width: '300px' }} /> }
      </div>
    )
  }


  protected hundleUploadStart = () => {
    this.setState({
      isUploading: true,
      progress: 0
    });
  }

  protected hundleUploadError = (error: any) => {
    this.setState({
      isUploading: false
    });
    window.console.log(error);
  }

  protected hundleUploadSuccess = (filename: string) => {
    this.setState({
      isUploading: false,
      name: filename,
      progress: 100
    });

    firebase.storage().ref('images')
      .child(filename).getDownloadURL()
      .then(url => {
        this.setState({fileURL: url})
      })

    this.props.storeFilename(filename);
  }

  protected hundleProgress = (progress: number) => {
    this.setState({
      progress
    });
  }
}
