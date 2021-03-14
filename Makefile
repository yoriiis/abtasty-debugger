build-release: create-release-chrome create-release-browser

create-release-chrome:
	npm run release:chrome && cd ./web/ && zip --recurse-paths ../release-chrome.zip ./dist && cd ../

create-release-browser:
	npm run release:browser && cd ./web/ && zip --recurse-paths ../release-browser.zip ./dist && cd ../
