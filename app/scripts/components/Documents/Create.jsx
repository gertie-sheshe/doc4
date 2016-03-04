// (function() {
//   var React = require('react');
//   var ReactDOM = require('react-dom');
//   var History = require('react-router').History;
//   var Documents = require('../Documents/Documents.jsx');
//   var Public = require('../Documents/PublicDocs.jsx');
//   var DocumentStore = require('../../stores/DocumentStore');
//   var DocumentAction = require('../../actions/DocumentActions');
//   var UserAction = require('../../actions/UserActions');
//   var RoleAction = require('../../actions/RoleAction');
//   var UserStore = require('../../stores/UserStore');
//   var RoleStore = require('../../stores/RoleStore');
//   var Users = require('../UserList/Users.jsx');
//   var toastr = require('toastr');
//   var popups = require('popups');
//   var NewDoc = require('../Documents/NewDoc.jsx');
//   var Select = require('react-select');
//
//
//   var Dashboard = new React.createClass({
//     mixins: [History],
//
//     getInitialState: function() {
//       return {
//         users: [],
//         user: {
//           name: {
//             first: '',
//             last: ''
//           },
//           username: '',
//           email: '',
//           role: '',
//         },
//         ownerId: '',
//         ownerDocuments: [],
//         userDocuments: [],
//         document: {
//           title: '',
//           content: ''
//         },
//         options: [
//           {
//           value: 'My Documents', label: 'My Documents'
//           },
//           {
//             value: 'Public Documents', label: 'Public Documents'
//           }
//         ]
//       };
//     },
//
//     componentDidMount: function() {
//       this.dialogInit();
//       this.profileInit();
//       // this.getUsers();
//       // this.getDecoded();
//       // this.setDecoded();
//       DocumentStore.addChangeListener(this.getOwnerDocuments, 'owner');
//       // DocumentStore.addChangeListener(this.saveDocument, 'owner');
//       DocumentStore.addChangeListener(this.getUserDocuments, 'documents');
//       // setInterval(this.getDecoded, 4000);
//       // setInterval(this.getOwnerDocuments, 7000);
//     },
//
//     componentWillMount: function() {
//       var token = localStorage.getItem('x-access-token');
//       UserStore.addChangeListener(this.getUsers, 'users');
//       UserStore.addChangeListener(this.getDecoded, 'decode');
//       UserAction.decode(token);
//       UserAction.userData(token);
//
//     },
//
//     dialogInit: function() {
//       var docDialog = document.querySelector('#doc-dialog');
//       var docDialogButton = document.querySelector('#show-doc-dialog');
//       if (!docDialog.showModal) {
//         dialogPolyfill.registerDialog(docDialog);
//       }
//       docDialogButton.addEventListener('click', function() {
//         docDialog.showModal();
//       });
//       docDialog.querySelector('.close').addEventListener('click', function() {
//         docDialog.close();
//       });
//     },
//
//     profileInit: function() {
//       var profDialog = document.querySelector('.prof-dialog');
//       var profDialogButton = document.querySelector('.show-prof-dialog');
//       if (!profDialog.showModal) {
//         dialogPolyfill.registerDialog(profDialog);
//       }
//       profDialogButton.addEventListener('click', function() {
//         profDialog.showModal();
//       });
//       profDialog.querySelector('.close').addEventListener('click', function() {
//         profDialog.close();
//       });
//     },
//
//     logout: function() {
//       localStorage.removeItem('x-access-token');
//       this.history.pushState(null, '/');
//     },
//
//     getOwnerDocuments: function() {
//       var token = localStorage.getItem('x-access-token');
//       var ownDocs = DocumentStore.getOwnerDocs(token, this.state.ownerId);
//       console.log('Returned owner documents', ownDocs);
//       this.setState({
//         ownerDocuments: ownDocs
//       });
//     },
//
//     getUserDocuments: function() {
//       var userDocs = DocumentStore.getUserDocs();
//       console.log('Returned user documents', userDocs);
//       this.setState({
//         userDocuments: userDocs
//       });
//     },
//
//     getDecoded: function() {
//       var decoded = UserStore.getDecodedData();
//       console.log('decoded ndio hii', decoded);
//       if (decoded.message === 'You are not authenticated user') {
//         toastr.error('You must be logged in bitte :)', {timeout: 3000});
//         this.history.pushState(null, '/');
//       } else {
//         this.setState({ownerId: decoded._id});
//         var token = localStorage.getItem('x-access-token');
//         DocumentAction.userDocuments(token);
//         console.log(this.state.ownerId);
//         DocumentAction.ownerDocuments(token, this.state.ownerId);
//       }
//     },
//
//
//     getUsers: function() {
//       var updatedUsers = UserStore.getUserData();
//       console.log('Returned users', updatedUsers);
//       this.setState({
//         users: updatedUsers
//       });
//     },
//
//     fetchInputValues: function(event) {
//       var field = event.target.name;
//       var value = event.target.value;
//       this.state.document[field] = value;
//       this.setState({document: this.state.document});
//     },
//
//     saveDocument: function() {
//       var token = localStorage.getItem('x-access-token');
//       DocumentAction.createDocument(this.state.document, token);
//      toastr.success('Document successfully created', {timeout: 1500});
//     },
//
//     render: function() {
//       return (
//         <div id="drawer" className="mdl-layout mdl-js-layout
//           mdl-layout--fixed-header" >
//         <header className="mdl-layout__header">
//           <div className="mdl-layout__header-row">
//             <span className="mdl-layout-title">doc 4.0</span>
//             <div className="mdl-layout-spacer"></div>
//             <nav className="mdl-navigation">
//               <button  className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored show-prof-dialog">
//                 <i className="material-icons">person</i>
//               </button>
//               <dialog className="mdl-dialog prof-dialog">
//                 <p>{this.state.user.name.first}</p>
//                 <p>{this.state.user.name.last}</p>
//                 <p>{this.state.user.username}</p>
//                 <p>{this.state.user.email}</p>
//                 <p>{this.state.user.role}</p>
//                   <div className="mdl-grid">
//                     <div className="mdl-cell mdl-cell--6-col">
//                       <button type="button" className="mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Close</button>
//                     </div>
//                   </div>
//               </dialog>
//               <button id="show-doc-dialog" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" onClick={this.logout}>
//                 <i className="material-icons">launch</i>
//               </button>
//             </nav>
//           </div>
//         </header>
//         <div className="mdl-layout__drawer">
//           <span className="mdl-layout-title">users</span>
//           <nav className="mdl-navigation">
//             <ul className="demo-list-icon mdl-list">
//             <Users users={this.state.users}/>
//             </ul>
//            </nav>
//          </div>
//         <main className="mdl-layout__content">
//           <div className="mdl-grid">
//             <div id="ownerdoc" className="mdl-cell mdl-cell--8-col">
//               <div className="mdl-cell mdl-cell--6-col">
//                 <div className="demo-card-square mdl-card mdl-shadow--2dp">
//                   <div className="mdl-card__title mdl-card--expand">
//                     <h1 className="mdl-card__title-text">Title:&nbsp;  Ola</h1>
//                   </div>
//                   <div className="mdl-card__supporting-text">
//                     <form action="post">
//                       <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
//                           <input className="mdl-textfield__input" type="text" id="uname" name="username" />
//                           <label className="mdl-textfield__label" htmlFor="uname">Username</label>
//                       </div>
//                       <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
//                           <input className="mdl-textfield__input" type="password" id="pword" name="password" />
//                           <label className="mdl-textfield__label" htmlFor="pword">Password</label>
//                       </div>
//                       </form>
//                   </div>
//                   <div className="mdl-card__actions mdl-card--border">
//                     <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect ">
//                       Read More
//                     </button>
//                     <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" >
//                       Delete Document
//                     </a>
//                     <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" >
//                       Edit Document
//                     </a>
//                     <a href={'/dashboard'}>Back</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div id="userdoc" className="mdl-cell mdl-cell--4-col">
//               <Public documents={this.state.userDocuments} />
//             </div>
//           </div>
//         </main>
//     </div>
//       );
//     }
//   });
//   module.exports = Dashboard;
// })();
