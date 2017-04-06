default: demo

full: clean reinstall demo

demo: datab.demo.js
	browserify datab.demo.js -o datab.demo.bundle.js

reinstall:
	npm uninstall datab
	npm install ..

clean: 
	rm -f datab.demo.bundle.js
