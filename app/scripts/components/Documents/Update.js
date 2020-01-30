import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentDocument } from '../../redux/documents/documents.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { updateDocumentStartAsync } from '../../redux/documents/documents.actions';

class Update extends Component {
  state = {
    title: '',
    content: '',
    access: '',
  };

  componentDidMount = () => {
    const { currentDocument } = this.props;

    this.setState({
      title: currentDocument[0].title,
      content: currentDocument[0].content,
      access: 'Admin',
    });
  };

  updateDocument = () => {
    const {
      history,
      currentDocument,
      currentUser,
      updateDocumentStartAsync,
    } = this.props;

    updateDocumentStartAsync(
      currentDocument[0]._id,
      this.state,
      currentUser.token,
      history,
    );

    // console.log('POLEE', this.state);
  };

  handleChange = event => {
    event.preventDefault();

    console.log(event.target.value);

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { history } = this.props;
    return (
      <div className="mdl-grid">
        <div
          id="update-doc"
          className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet"
        >
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__supporting-text mdl-cell mdl-cell--12-col">
              <form id="form-document">
                <div className="mdl-textfield mdl-js-textfield  mdl-cell--11-col">
                  <label className="mdl-textfield__label" htmlFor="title">
                    {this.state.title}
                  </label>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-cell--11-col">
                  <label className="mdl-textfield__label" htmlFor="text">
                    {this.state.content}
                  </label>

                  <textarea
                    className="mdl-textfield__input"
                    type="text"
                    rows="6"
                    cols="60"
                    id="text"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className="mdl-grid">
                  <div className="mdl-cell--12-col radio">
                    <input
                      type="radio"
                      name="access"
                      value="Admin"
                      defaultChecked
                      onChange={this.handleChange}
                    />
                    &nbsp; Admin
                  </div>

                  <div className="mdl-cell--12-col radio">
                    <input
                      type="radio"
                      name="access"
                      value="Staff"
                      onChange={this.handleChange}
                    />
                    &nbsp; Staff
                  </div>

                  <div className="mdl-cell--12-col radio">
                    <input
                      type="radio"
                      name="access"
                      value="Viewer"
                      onChange={this.handleChange}
                    />
                    &nbsp; Viewer
                  </div>
                </div>
                <div className="mdl-dialog__actions mdl-cell mdl-cell--11-col">
                  <button
                    id="updatedoc"
                    type="button"
                    className="mdl-button"
                    onClick={this.updateDocument}
                  >
                    UPDATE
                  </button>

                  <a
                    type="button"
                    className="mdl-button close"
                    onClick={() => history.push('/dashboard')}
                  >
                    CANCEL
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
  currentDocument: selectCurrentDocument,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { updateDocumentStartAsync })(Update);
