// Coverage command for mocha back-end coverage

mocha -r jscoverage --covout=html --covinject=true --coverage=90,85,75 test

// Coverage for front end tests

./node_modules/mocha/bin/mocha --require blanket --reporter html-cov client/front/components/**/*test.js > coverage.html
