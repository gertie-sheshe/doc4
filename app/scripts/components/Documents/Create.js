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
    access: 'Viewer',
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

  onTextEditorChange = content => {
    this.setState({ content });
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
                    id="text"
                    name="content"
                    className="materialize-textarea"
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
                    <label>
                      <input
                        type="radio"
                        name="access"
                        value="Admin"
                        onInput={this.handleChange}
                      />
                      <span>Admin</span>
                    </label>
                  </div>
                  <div className="mdl-cell--12-col radio">
                    <label>
                      <input
                        type="radio"
                        name="access"
                        value="Staff"
                        onInput={this.handleChange}
                      />
                      <span>Staff</span>
                    </label>
                  </div>
                  <div className="mdl-cell--12-col radio">
                    <label>
                      <input
                        type="radio"
                        name="access"
                        value="Viewer"
                        defaultChecked
                        onInput={this.handleChange}
                      />
                      <span>Viewer</span>
                    </label>
                  </div>
                </div>
                <div className="mdl-card__actions mdl-grid">
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
