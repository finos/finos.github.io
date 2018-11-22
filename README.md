# finos.github.io
Welcome to the FINOS Foundation Catalog!

This project powers the web page available at [finos.github.io](https://finos.github.io/), and provides a browsable gallery of the GitHub activities hosted by FINOS.

The Catalogue allows visitors to:
- Visualize Foundation activities that are made up of one or more multiple GitHub repositories
- Filter and/or sort activities by various dimensions (with these parameters bookmarkable)
- Support an embedded mode `embed=true` that removes the sidebar

## Run locally
Please install [nodeJS](https://nodejs.org/en/) before starting.
```
npm install http-server -g
git clone git@github.com:finos/finos.github.io.git
cd finos.github.io
http-server
```

`rawgit` allows to preview the page also on other branches forks; example: [https://rawgit.com/finos/finos.github.io/index.html](https://rawgit.com/finos/finos.github.io/index.html).

## Libraries
The Catalogue relies on the following external libraries:
- [JQuery](https://jquery.com/) (v3.2.1)
- [Bootstrap](https://getbootstrap.com) (v3.3.7)
- [JS URL](https://github.com/davidstutz/bootstrap-multiselect) (v2.5.2)
- [Multiselect Bootstrap/JQuery plugin](https://github.com/davidstutz/bootstrap-multiselect)
- [Pinterest Grid JQuery plugin](https://www.jqueryscript.net/layout/Simple-jQuery-Plugin-To-Create-Pinterest-Style-Grid-Layout-Pinterest-Grid.html)

## Contribute
Checkout our [GitHub issues](https://github.com/finos/finos.github.io/issues) for pending issues.
