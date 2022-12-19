build-release: clean-previous-release create-release-v3 create-release-v2

clean-previous-release:
	rm -f ./release-chrome.zip ./release-edge.zip ./release-firefox.zip

# Used by Chrome and Edge
create-release-v3:
	npm run release:v3 && cd ./web && zip --recurse-paths ../release-chrome.zip ./ && cd ../
	cp ./release-chrome.zip ./release-edge.zip

# Used by Firefox only
create-release-v2:
	npm run release:v2 && cd ./web && zip --recurse-paths ../release-firefox.zip ./ && cd ../
