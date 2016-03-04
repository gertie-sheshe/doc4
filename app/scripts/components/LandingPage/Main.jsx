(function() {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
    module.exports = React.createClass({
      render: function() {
        return (
          <div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
             <div className="mdl-layout__header-row">
               <span className="mdl-layout-title">Title</span>
               <div className="mdl-layout-spacer"></div>
               <nav className="mdl-navigation mdl-layout--large-screen-only">
                 <a className="mdl-navigation__link" href="">Link</a>
                 <a className="mdl-navigation__link" href="">Link</a>
                 <a className="mdl-navigation__link" href="">Link</a>
                 <a className="mdl-navigation__link" href="">Link</a>
               </nav>
             </div>
           </header>
           <div className="mdl-layout__drawer">
             <span className="mdl-layout-title">Title</span>
             <nav className="mdl-navigation">
               <a className="mdl-navigation__link" href="">Link</a>
               <a className="mdl-navigation__link" href="">Link</a>
               <a className="mdl-navigation__link" href="">Link</a>
               <a className="mdl-navigation__link" href="">Link</a>
             </nav>
           </div>
          <main className="mdl-layout__content">
            {this.props.children}
          </main>
          </div>
        </div>
        );
      }
    });
})();
