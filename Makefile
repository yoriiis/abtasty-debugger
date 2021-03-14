build-release: create-release-chrome create-release-firefox

create-release-chrome:
	npm run release:chrome && cd ./web/ && zip --recurse-paths ../release-chrome.zip ./dist && cd ../

create-release-firefox:
	npm run release:firefox && cd ./web/ && zip --recurse-paths ../release-firefox.zip ./dist && cd ../
