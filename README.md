# symphonyoss.github.io
Welcome to the Symphony Software Foundation Project Catalogue!

This project (specifically, the `master` branch) powers the web page available at [symphonyoss.github.io](symphonyoss.github.io) (using [GitHub Pages](https://symphonyoss.atlassian.net/wiki/spaces/FM/pages/80945878/Documentation)), an enriched/browsable gallery of our [GitHub hosted projects](github.com/symphonyoss).

The Project Catalogue allows to:
- Visualise Foundation projects, which aggregate GitHub repositories
- Filter projects by **language** and **[project lifecycle state](https://symphonyoss.atlassian.net/wiki/spaces/FM/pages/3211338/Project+Lifecycle)**
- Sort projects (ascending/descending) by **heat** (value that weights all stats extracted from GitHub repositories) and **name**
- Bookmark URL with filters and sorts

## Run locally
Please install [nodeJS](https://nodejs.org/en/) before starting.
```
npm install http-server -g
git clone git@github.com:symphonyoss/symphonyoss.github.io.git
cd symphonyoss.github.io
http-server
```

`rawgit` allows to preview the page also on other branches forks; example: [rawgit.com/symphonyoss/symphonyoss.github.io/bootstrap/index.html](rawgit.com/symphonyoss/symphonyoss.github.io/bootstrap/index.html).

## How does it work
1. `index.html` imports all JS/CSS project contents (including `[js/gh-catalogue/config.js](js/gh-catalogue/config.js)` that defines all rendering configurations and overrides), sets up the main page layout (using the JQuery Pinterst Grid plugin) and invokes `renderCatalogue()` on `[js/gh-catalogue/main.js](js/gh-catalogue/main.js)`.
2. `renderCatalogue()` scans the contents of a `activities.json` file, which contains all the data that is necessary to render the page; this file is [periodically updated](https://github.com/symphonyoss/symphonyoss.github.io/commits/bootstrap/activities.json) by automated build tasks powered by the Foundation.
3. `renderCatalogue()` generates sorting and filtering fields, loading the state from current URL
4. `renderCatalogue()` renders out the project grid, delegating filtering (to `filters.js`) and sorting (to `sort.js`).

All visualisation logic is centralised in `html-render.js`.

## Libraries
The Project Catalogue relies on the following external libraries:
- [JQuery](https://jquery.com/) (v3.2.1)
- [Bootstrap](https://getbootstrap.com) (v3.3.7)
- [JS URL](https://github.com/davidstutz/bootstrap-multiselect) (v2.5.2)
- [Multiselect Bootstrap/JQuery plugin](https://github.com/davidstutz/bootstrap-multiselect)
- [Pinterest Grid JQuery plugin](https://www.jqueryscript.net/layout/Simple-jQuery-Plugin-To-Create-Pinterest-Style-Grid-Layout-Pinterest-Grid.html)

## Contribute
Checkout our [GitHub issues](https://github.com/symphonyoss/symphonyoss.github.io/issues) for pending issues.

The most urgent issues are:
- Provide a [more modular structure](https://github.com/symphonyoss/symphonyoss.github.io/issues/9) (using tools like Yarn, WebPack, Bower, Browserify, ...)
- [Embed Project Catalogue as a widget](https://github.com/symphonyoss/symphonyoss.github.io/issues/10) to be visualised on our [Wiki](symphonyoss.atlassian.net/wiki), [website](symphony.foundation), Symphony chat and more
