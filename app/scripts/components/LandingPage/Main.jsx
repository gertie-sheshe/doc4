(function() {
  'use strict';

  var React = require('react');

    module.exports = React.createClass({
      // componentDidMount: function(){
      //   var token = localStorage.getItem('x-access-token');
      //   if(token){
      //     console.log('KWENYE SESSION', token);
      //   } else {
      //     console.log('no token');
      //   }
      //
      // },
      propTypes: {
        children: React.PropTypes.element.isRequired
      },
      render: function() {
        return (
            <div>
              {this.props.children}
            </div>
        );
      }
    });
})();
