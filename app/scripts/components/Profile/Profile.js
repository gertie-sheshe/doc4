// (function() {
//   var React = require('react');
//   var ReactDOM = require('react-dom');
//   var localStorage = require('localStorage');
//   var DocumentAction = require('../../actions/DocumentActions');
//   var browserHistory = require('react-router').browserHistory;
//   var UserAction = require('../../actions/UserActions');
//   var UserStore = require('../../stores/UserStore');
//   var toastr = require('toastr');

//   var ProfilePage = new React.createClass({
//     contextTypes: {
//       router: React.PropTypes.object
//     },
//     getInitialState: function() {
//       return {
//         userData: '',
//         last: '',
//         first: ''
//       };
//     },

//     componentWillMount: function() {
//       var id = localStorage.getItem('user');
//       var token = localStorage.getItem('x-access-token');
//       if(!token) {
//         browserHistory.push('/');
//         toastr.error('You must be logged in bitte :)', {timeout: 3000});
//       }
//       UserAction.getUser(token, id);
//     },

//     componentDidMount: function() {
//       var token = localStorage.getItem('x-access-token');
//       UserStore.addChangeListener(this.getUserData, 'user');
//       UserStore.addChangeListener(this.getUpdatedUser, 'update');
//       // UserAction.decode(token);
//     },

//     getUpdatedUser: function() {
//       var data = UserStore.getUpdatedData();
//       this.setState({
//         userData: data,
//         last: data.name.last,
//         first: data.name.first
//       });
//     },

//     getUserData: function() {
//       var data = UserStore.getUser();
//       this.setState({
//         userData: data,
//         last: data.name.last,
//         first: data.name.first
//       });
//     },

//     updateUserData: function() {
//       // var token = localStorage.getItem('x-access-token');
//       // USserAction.update(token, id);
//       this.context.router.push('/edit');
//     },

//     dashboard: function() {
//       this.context.router.push('/dashboard');
//     },
//     render: function() {
//       return (
//         <div className="mdl-grid">
//         <div id="profile" className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet">
//         <div className="demo-card-square mdl-card mdl-shadow--2dp">
//           <div className="mdl-card__supporting-text">
//             <form action="post">
//               <div className="mdl-grid">
//                 <div className="mdl-cell mdl-cell--12-col">
//                   <h5>First Name: </h5>
//                   {this.state.first}
//                 </div>
//                 <div className="mdl-cell mdl-cell--12-col">
//                   <h5>Last Name: </h5>
//                   {this.state.last}
//                 </div>
//                 <div className="mdl-cell mdl-cell--12-col">
//                   <h5>Username: </h5>
//                   {this.state.userData.username}
//                 </div>
//                 <div className="mdl-cell mdl-cell--12-col">
//                   <h5>Email: </h5>
//                   {this.state.userData.email}
//                 </div>
//                 <div className="mdl-cell mdl-cell--12-col">
//                   <h5>Role: </h5>
//                   {this.state.userData.role}
//                 </div>
//               </div>
//               </form>
//           </div>
//           <div className="mdl-card__actions mdl-card--border">
//             <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.dashboard}>
//               DASHBOARD
//             </a>
//             <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.updateUserData}>
//               EDIT
//             </a>
//           </div>
//         </div>
//       </div>
//       </div>
//       );
//     }
//   });
//   module.exports = ProfilePage;
// })();

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

class Profile extends Component {
  componentDidMount = () => {
    const { currentUser } = this.props;
  };

  render() {
    const { history, currentUser } = this.props;
    return (
      <div className="mdl-grid">
        <div
          id="profile"
          className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet"
        >
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__supporting-text">
              <form action="post">
                <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>First Name: </h5>
                    {currentUser.name.first}
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>Last Name: </h5>
                    {currentUser.name.last}
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>Username: </h5>
                    {currentUser.username}
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>Email: </h5>
                    {currentUser.email}
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>Role: </h5>
                    {currentUser.role}
                  </div>
                </div>
              </form>
            </div>

            <div className="mdl-card__actions mdl-card--border">
              <a
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                onClick={() => history.push('/dashboard')}
              >
                DASHBOARD
              </a>

              <a
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                onClick={() => history.push('/edit')}
              >
                EDIT
              </a>
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

export default connect(mapStateToProps)(Profile);
