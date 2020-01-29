import React from 'react';

const LandingPage = () => (
  <div className="img">
    <div id="back"></div>
    <div className="content">
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          <h2>Doc 4.0 </h2>
          <h2>
            The place to go to create, manage and edit documents. Get started
            today
          </h2>
        </div>
      </div>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          <a
            href="/auth"
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          >
            GET STARTED
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
