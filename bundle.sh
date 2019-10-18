#/bin/bash

for file in ./src/js/*
do
	base=$(echo $(basename -- "$file") | cut -d. -f 1)_bundle.js
	echo Bundling "$file"
	browserify "$file" -o "$base"
	echo Bundled "$file" into "$base"
done

echo Bundling app.js
browserify app.js -o bundle.js
echo Bundled app.js into bundle.js
