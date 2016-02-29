(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({

  render: function() {
    return (
      <div>
        <h3 id="new-doc" className="mdl-dialog__title">New Document</h3>
        <hr />
          <form id ="form-document" action="post" onSubmit={this.props.handleLoginAction}>
            <div className="mdl-textfield mdl-js-textfield  mdl-cell--8-col">
                <input className="mdl-textfield__input" type="text" id="title" name="title" onChange={this.props.onChange}/>
                <label className="mdl-textfield__label" htmlFor="title">Title</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <textarea className="mdl-textfield__input" type="text" rows= "3" id="text" name="content" onChange={this.props.onChange}></textarea>
              <label className="mdl-textfield__label" htmlFor="text">Text lines...</label>
            </div>
            </form>
          <div id="document-form" className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.props.saveDoc}>Create</button>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <button type="button" className="mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Cancel</button>
            </div>
          </div>
      </div>
    );
  }
});
})();
