(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var browserHistory = require('react-router').browserHistory;
  var localStorage = require('localStorage');
  var DocumentAction = require('../../actions/DocumentActions');
  var toastr = require('toastr');

  var Create = new React.createClass({
    contextTypes: {
      router: React.PropTypes.object
    },
    componentWillMount: function() {
      var token = localStorage.getItem('x-access-token');
      if(!token) {
        this.context.router.push('/dashboard');
        // window.location.assign('/dashboard');
        // browserHistory.push('/dashboard');
      }
    },

    getInitialState: function() {
      return {
        document: {
          title: '',
          content: '',
          access: ''
        }
      };
    },

    fetchInputValues: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      console.log(value);
      this.state.document[field] = value;
      this.setState({document: this.state.document});
    },

    saveDocument: function() {
      var token = localStorage.getItem('x-access-token');
      var doc = this.state.document;
      console.log('DOCUMENT', doc);
      if(doc.title.length < 1 && doc.content.length < 1) {
        toastr.warning('Document needs title and body', {timeout: 1000});
      }
      else if(doc.title.length < 1) {
        toastr.warning('Document needs a title', {timeout: 1000});
      }
      else if(doc.content.length < 1) {
        toastr.warning('Document needs content', {timeout: 1000});
      } else {
        DocumentAction.createDocument(this.state.document, token);
        toastr.success('Document successfully created', {timeout: 100});
        // window.location.assign('/dashboard');
        // browserHistory.push('/dashboard');
        this.context.router.push('/dashboard');
      }
    },

    dashboard: function() {
      this.context.router.push('/dashboard');
    },

    render: function() {
      return (
        <div className="mdl-grid">
        <div id="create-doc" className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet">
        <div className="demo-card-square mdl-card mdl-shadow--2dp">
          <div className="mdl-card__supporting-text">
            <form id ="form-document" action="post">
              <div className="mdl-textfield mdl-js-textfield  mdl-cell--12-col">
                  <input className="mdl-textfield__input" type="text" id="title" name="title" onChange={this.fetchInputValues}/>
                  <label className="mdl-textfield__label" htmlFor="title">Document Title</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-cell--12-col">
                <textarea className="mdl-textfield__input" type="text" rows= "20" id="text" name="content" onChange={this.fetchInputValues}></textarea>
                <label className="mdl-textfield__label" htmlFor="text">Content</label>
              </div>
              <div className="mdl-grid">
                <div className="mdl-cell--4-col-desktop mdl-cell--12-col radio">
                  <input type="radio" name="access" value="Admin" onInput={this.fetchInputValues}>&nbsp; Admin</input>
                </div>
                <div className="mdl-cell--4-col-desktop mdl-cell--12-col radio">
                  <input type="radio" name="access" value="Staff" onInput={this.fetchInputValues}>&nbsp; Staff</input>
                </div>
                <div className="mdl-cell--4-col-desktop mdl-cell--12-col radio">
                  <input type="radio" name="access" value="Viewer" defaultChecked onInput={this.fetchInputValues}>&nbsp; Viewer</input>
                </div>
              </div>
              </form>
          </div>
          <div className="mdl-card__actions mdl-card--border mdl-grid">
            <div className="mdl-cell--6-col mdl-cell--3-offset">
            <a id="createdoc" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.saveDocument}>
              CREATE
            </a>
            <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.dashboard}>
              BACK
            </a>
          </div>
        </div>
        </div>
      </div>
      </div>
      );
    }
  });
  module.exports = Create;
})();
