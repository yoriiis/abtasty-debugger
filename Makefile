build-release: clean-previous-release create-release

clean-previous-release:
	rm -f ./release-chrome.zip ./release-edge.zip ./release-firefox.zip

# Used by Chrome and Edge
create-release:
	npm run release && zip --recurse-paths release.zip ./public
