# Project installation

The project is open-source and available on the public repository, download the latest release from the release page: [abtasty-debugger](https://github.com/yoriiis/abtasty-debugger/releases).

## Prerequisites

The project was built for Node.js `18.12.0` and npm `8.19.2`, on macOS `12.6`.

## Installation

Install Node.js dependencies

```bash
npm install
```

Build the code

```bash
npm run release:v2 # Firefox only
# npm run release:v3 # Chrome and Edge
```

The source code is available in the `./src` directory and the build code is available in the `./web` directory.

## Test

The extension allows you to display the A/B tests created by the [ABTasty](https://www.abtasty.com) site.

If the page contains A/B tests, the extension icon displays a counter and when the popup is opened a list and a detail of each of the elements are displayed. This information is useful for testing, debugging, and visualizing A/B testing on a website.
If the page does not load the ABTasty script or if there are no A/B tests, the counter does not display and the popup displays a "Content not found".

Below is a list of websites that have at least one A/B test on their page

- [https://www.abtasty.com](https://www.abtasty.com)

<!-- Add other examples -->
