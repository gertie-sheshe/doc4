(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var History = require('react-router').History;
  var Documents = require('../Documents/Documents.jsx');
  var Public = require('../Documents/PublicDocs.jsx');
  var DocumentStore = require('../../stores/DocumentStore');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var RoleAction = require('../../actions/RoleAction');
  var UserStore = require('../../stores/UserStore');
  var RoleStore = require('../../stores/RoleStore');
  var Users = require('../UserList/Users.jsx');
  var toastr = require('toastr');
  var popups = require('popups');
  var NewDoc = require('../Documents/NewDoc.jsx');
  var Select = require('react-select');
  var localStorage = require('localStorage');


  var Dashboard = new React.createClass({
    mixins: [History],
    getInitialState: function() {
      that = this;
      return {
        document: [],
        updatedDoc: {
          title: '',
          content: ''
        }
      };
    },

    componentWillMount: function() {
      var pathArray = window.location.pathname.split('/')[1];
      var token = localStorage.getItem('x-access-token');
      DocumentAction.setDoc(pathArray, token);
      console.log(pathArray);

    },

    componentDidMount: function() {
      DocumentStore.addChangeListener(this.handleSelected, 'doc');

    },

    handleSelected: function() {
      var selectDoc = DocumentStore.getSelectedDoc();
      var doc = [].concat(selectDoc);
      console.log('mydoc',selectDoc);
      this.setState({
        document: doc
      });
      this.editInit();
      console.log('WOOOO', this.state.document);
    },

    editInit: function() {
      var editDialog = document.querySelector('#edit-dialog');
      var editDialogButton = document.querySelector('#show-edit-dialog');
      if (!editDialog.showModal) {
        dialogPolyfill.registerDialog(editDialog);
      }
      editDialogButton.addEventListener('click', function() {
        editDialog.showModal();
      });
      editDialog.querySelector('.close').addEventListener('click', function() {
        editDialog.close();
      });
    },

    update: function() {
      var newDoc = this.state.updatedDoc;
      console.log('updated doc function', newDoc);
      var token = localStorage.getItem('x-access-token');
      var docId = window.location.pathname.split('/')[1];
      DocumentAction.updateDoc(docId, newDoc, token);
      toastr.success('Document has been Updated', {timeout: 3000});
      that.history.pushState(null, '/dashboard');
    },

    fetchInputValues: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      this.state.updatedDoc[field] = value;
      this.setState({updatedDoc: this.state.updatedDoc});
    },

    render: function() {
      if(this.state.document) {
        var data = this.state.document.map(function(doc) {
          var deleteDoc = function() {
            popups.confirm({
              content:     '<h1>Are you sure you want to delete this document?</h1>',
              labelOk:     'Yes',
              labelCancel: 'No',
              onSubmit: function() {
                var id = window.location.pathname.split('/')[1];
                var token = localStorage.getItem('x-access-token');
                DocumentAction.deleteDocument(id, token);
                toastr.success('Document has been deleted', {timeout: 3000});
                that.history.pushState(null, '/dashboard');
              },
              onClose: function() {
                console.log(':( kwi kwi');
              }
            });
          };
          return (
            <div className="mdl-grid" key={doc._id}>
              <div id="ownerdoc" className="mdl-cell mdl-cell--12-col">
                <div className="mdl-cell mdl-cell--6-col">
                  <div className="demo-card-square mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title mdl-card--expand">
                      <h1 className="mdl-card__title-text">Title:&nbsp;  {doc.title}</h1>
                    </div>
                    <div className="mdl-card__supporting-text">
                      {doc.content}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                      <a id="show-edit-dialog" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" >
                        Edit
                      </a>
                        <dialog id="edit-dialog" className="mdl-dialog">
                          <form id ="form-document" >
                            <div className="mdl-textfield mdl-js-textfield  mdl-cell--8-col">
                                <input className="mdl-textfield__input" type="text" id="title" name="title" onChange={that.fetchInputValues} />
                                <label className="mdl-textfield__label" htmlFor="title" >Title</label>
                            </div>
                            <div className="mdl-textfield mdl-js-textfield">
                              <textarea className="mdl-textfield__input" type="text" rows= "3" id="text" name="content" onChange={that.fetchInputValues}>{doc.content}</textarea>
                              <label className="mdl-textfield__label" htmlFor="text" ></label>
                            </div>
                            </form>
                          <div className="mdl-dialog__actions">
                            <button type="button" className="mdl-button" onClick={that.update}>UPDATE</button>
                            <button type="button" className="mdl-button close">CANCEL</button>
                          </div>
                        </dialog>
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={deleteDoc}>
                           Delete
                        </a>
                        <a href={'/dashboard'} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" >
                           Back
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }
      return (
        <div>
        {data}
      </div>
      );
    }
  });
  module.exports = Dashboard;
})();
