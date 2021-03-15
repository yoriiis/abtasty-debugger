build-release: create-release-chrome create-release-browser generate-zip

create-release-chrome:
	npm run release:chrome && cd ./web/ && zip --recurse-paths ../release-chrome.zip ./dist && cd ../

create-release-browser:
	npm run release:browser && cd ./web/ && zip --recurse-paths ../release-firefox.zip ./dist && cd ../

generate-zip:
	cp ./release-chrome.zip ./release-opera.zip && cp ./release-firefox.zip ./release-edge.zip
