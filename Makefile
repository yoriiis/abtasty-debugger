build-release: create-release-chrome

create-release-chrome:
	npm run release && cd ./web/ && zip --recurse-paths ../release-chrome.zip ./dist && cd ../
