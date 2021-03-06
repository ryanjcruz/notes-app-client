import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config.js';
import { invokeApig, s3Upload } from '../libs/awsLib';
import './NewNote.css';

class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;
    
    this.state = {
      isLoading: null,
      content: '',
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0];
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert('Please pick a file smalelr than 5MB');
      return;
    }

    this.setState({ isLoading: true });

    // call createNote which in turns call the Apig
    // after the note has been created, redirect ot the
    // homepage
    try {
      // try to upload first before creating the note
      // gets the returned URL and combines that with the note object
      const uploadFilename = (this.file) ? (await s3Upload(this.file, this.props.userToken)).Location : null;

      await this.createNote({
        content: this.state.content,
        attachment: uploadFilename,
      });
      this.props.history.push('/');
    } 
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  // pass the note object (content) as body
  createNote(note) {
    return invokeApig({
      path: '/notes',
      method: 'POST',
      body: note,
    }, this.props.userToken);
  }

  render() {
    return(
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl 
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea" />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl 
              onChange={this.handleFileChange}
              type="file" />
          </FormGroup>
          <LoaderButton 
            block
            bsStyle="primary"
            bsSize="large"
            disabled={ ! this.validateForm() } 
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating..." />
        </form>
      </div>
    );
  }
}

export default withRouter(NewNote);