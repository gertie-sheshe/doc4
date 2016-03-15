// Coverage command for mocha back-end coverage

mocha -r jscoverage --covout=html --covinject=true --coverage=90,85,75 test

// Coverage for front end tests

./node_modules/mocha/bin/mocha --require blanket --reporter html-cov client/front/components/**/*test.js > coverage.html

./node_modules/mocha/bin/mocha \ --require blanket \ --reporter mocha-lcov-reporter \ client/front/components/**/*test.js  | ./node_modules/coveralls/bin/coveralls.js

// lcov file for back-end

istanbul cover ./node_modules/mocha/bin/_mocha -- -R spec

https://github.com/cainus/codecov.io

export CODECOV_TOKEN=f086d79d-37bf-4ebe-8ffb-c6f31bc67e63


// lcov for front end

"./node_modules/mocha/bin/mocha --require blanket --reporter html-cov client/front/components/**/*test.js > lcov.info",
