(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({

  render: function() {
    return (
      <div>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">Update</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aenan convallis.
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                View Updates
              </a>
            </div>
          </div>
        </div>

        <div className="mdl-cell mdl-cell--6-col">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">Update</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aenan convallis.
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                View Updates
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">Update</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aenan convallis.
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <div id="edit" className="icon material-icons">edit</div>
              <div className="mdl-tooltip" htmlFor="edit">
                Edit
              </div>
              <div id="deldoc" className="icon material-icons">delete</div>
              <div className="mdl-tooltip" htmlFor="deldoc">
                Delete Doc
              </div>
            </div>
          </div>
        </div>

        <div className="mdl-cell mdl-cell--6-col">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">Update</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aenan convallis.
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                View Updates
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
});
})();
