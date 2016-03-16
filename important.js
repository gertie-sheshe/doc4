// Coverage command for mocha back-end coverage

mocha -r jscoverage --covout=html --covinject=true --coverage=90,85,75 test

// Coverage for front end tests

./node_modules/mocha/bin/mocha --require blanket --reporter html-cov client/testdom.js client/front/components/**/*test.js > coverage.html

./node_modules/mocha/bin/mocha \ --require blanket \ --reporter mocha-lcov-reporter \ client/front/components/**/*test.js  | ./node_modules/coveralls/bin/coveralls.js

// lcov file for back-end

istanbul cover ./node_modules/mocha/bin/_mocha -- -R spec

https://github.com/cainus/codecov.io

export CODECOV_TOKEN=f086d79d-37bf-4ebe-8ffb-c6f31bc67e63


// lcov for front end

"./node_modules/mocha/bin/mocha --require blanket --reporter html-cov client/front/components/**/*test.js > lcov.info",



<dialog id="edit-dialog" className="mdl-dialog">
  <form id ="form-document" >
    <div className="mdl-textfield mdl-js-textfield  mdl-cell--11-col">
        <input className="mdl-textfield__input" type="text" id="title" name="title" onChange={that.fetchInputValues} />
        <label className="mdl-textfield__label" htmlFor="title" >{doc.title}</label>
    </div>
    <div className="mdl-textfield mdl-js-textfield mdl-cell--11-col">
      <textarea className="mdl-textfield__input" type="text" rows= "6" id="text" name="content" onChange={that.fetchInputValues}>{doc.content}</textarea>
      <label className="mdl-textfield__label" htmlFor="text" >Content</label>
    </div>
    <div className="mdl-grid">
      <div className="mdl-cell--3-col">
        <input id="roles" type="radio" name="access" value="Admin" onChange={that.fetchInputValues}>Admin</input>
      </div>
      <div className="mdl-cell--3-col">
        <input id="roles" type="radio" name="access" value="Staff" onChange={that.fetchInputValues}>Staff</input>
      </div>
      <div className="mdl-cell--3-col">
        <input id="roles" type="radio" name="access" value="Viewer" onChange={that.fetchInputValues}>Viewer</input>
      </div>
      <div className="mdl-cell--3-col">
        <input id="roles" type="radio" name="access" value="None" onChange={that.fetchInputValues}>None</input>
      </div>
    </div>
    </form>
  <div className="mdl-dialog__actions">
    <button type="button" className="mdl-button" onClick={that.update}>UPDATE</button>
    <button type="button" className="mdl-button close">CANCEL</button>
  </div>
</dialog>
