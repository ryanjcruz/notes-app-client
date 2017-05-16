import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  PageHeader,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { invokeApig } from '../libs/awsLib';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      notes: [],
    };
  }

  // call the notes list api after mounting component
  async componentDidMount() {
    if (this.props.userToken === null) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      const results = await this.notes();
      this.setState({ notes: results });
    } 
    catch(e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  // return notes from the API helper
  notes() {
    return invokeApig({ path: '/notes' }, this.props.userToken);
  }

  // always render "Create a new note" as the first item by concatting it
  // with the notes object being returned
  // render the first line of the note as the header
  // onClick will navigate to the specific note.
  renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>(
      i !== 0
        ? ( <ListGroupItem
              key={note.noteId}
              href={`/notes/${note.noteId}`}
              onClick={this.handleNoteClick}
              header={note.content.trim().split('\n')[0]}>
                { "Created: " + (new Date(note.createdAt)).toLocaleString() }
            </ListGroupItem> )
        : ( <ListGroupItem
              key="new"
              href="/notes/new"
              onClick={this.handleNoteClick}>
                <h4>
                  <b>{'\uFF0B'}</b>
                  Create a new note
                </h4>
            </ListGroupItem> )
    ));
  }

  // go to the specific note URL
  handleNoteClick = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scatch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">Login</Link>
          <Link to="/signup" className="btn btn-success btn-lg">Signup</Link>
        </div>
      </div>
    );
  }

  // call render notes list when the endpoint has fetched notes
  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          { ! this.state.isLoading && this.renderNotesList(this.state.notes) }
        </ListGroup>
      </div>
    );
  }

  // render the lander of the list of notes depending on the userToken
  render() {
    return (
      <div className="Home">
        { this.props.userToken === null ? this.renderLander() : this.renderNotes() }
      </div>
    );
  }
}

export default withRouter(Home);