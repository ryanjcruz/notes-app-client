import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  PageHeader,
  ListGroup,
} from 'react-bootstrap';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      notes: [],
    };
  }

  renderNotesList(notes) {
    return null;
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scatch</h1>
        <p>A simple note taking app</p>
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