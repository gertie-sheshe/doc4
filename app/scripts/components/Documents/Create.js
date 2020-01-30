import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  createDocumentStartAsync,
  createDocumentStart,
} from '../../redux/documents/documents.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class Create extends Component {
  state = {
    title: '',
    content: '',
    access: '',
  };

  backToDashboard = () => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  createDocument = event => {
    event.preventDefault();
    const { currentUser, createDocumentStartAsync, history } = this.props;

    createDocumentStartAsync(this.state, currentUser.token, history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="mdl-grid">
        <div
          id="create-doc"
          className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet"
        >
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__supporting-text">
              <form id="form-document" onSubmit={this.createDocument}>
                <div className="mdl-textfield mdl-js-textfield  mdl-cell--12-col">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label" htmlFor="title">
                    Document Title
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-cell--12-col">
                  <textarea
                    className="mdl-textfield__input"
                    type="text"
                    rows="20"
                    required
                    id="text"
                    name="content"
                    onChange={this.handleChange}
                  ></textarea>
                  <label
                    className="mdl-textfield__label"
                    required
                    htmlFor="text"
                  >
                    Content
                  </label>
                </div>
                <div className="mdl-grid">
                  <div className="mdl-cell--12-col radio">
                    <input
                      type="radio"
                      name="access"
                      value="Admin"
                      onInput={this.handleChange}
                    />
                    &nbsp; Admin
                  </div>
                  <div className="mdl-cell--12-col radio">
                    <input
                      type="radio"
                      name="access"
                      value="Staff"
                      onInput={this.handleChange}
                    />
                    &nbsp; Staff
                  </div>
                  <div className="mdl-cell--12-col radio">
                    <input
                      type="radio"
                      name="access"
                      value="Viewer"
                      defaultChecked
                      onInput={this.handleChange}
                    />
                    &nbsp; Viewer
                  </div>
                </div>
                <div id="form-document" className="mdl-card__actions  mdl-grid">
                  <button
                    id="createdoc"
                    type="submit"
                    className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                  >
                    CREATE
                  </button>
                  <a
                    className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                    onClick={this.backToDashboard}
                  >
                    BACK
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { createDocumentStartAsync })(Create);
