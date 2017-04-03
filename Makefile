all: datab.min.js datab.demo.bundle.js

# package node lib for distribution
datab.min.js: src/datab-data.js
	uglifyjs src/datab-data.js > dist/datab.min.js

datab.demo.bundle.js: src/datab-data.js src/datab.js
	browserify src/datab.js -o demo/datab.demo.bundle.js
