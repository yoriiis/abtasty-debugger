build-release: create-release-chrome create-release-browser generate-zip

# Used by Chrome only
create-release-chrome:
	npm run release:chrome && cd ./web/dist && zip --recurse-paths ../../release-chrome.zip ./ && cd ../../

# Used by Firefox, Opera and Edge
create-release-browser:
	npm run release:browser && cd ./web/dist && zip --recurse-paths ../../release-firefox.zip ./ && cd ../../

generate-zip:
	cp ./release-firefox.zip ./release-opera.zip && cp ./release-firefox.zip ./release-edge.zip
