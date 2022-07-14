**NOTE!** - This repository was deprecated in favour of [https://landscape.finos.org]([url](https://landscape.finos.org)) - for source code, please visit [github.com/finos/finos-landscape](github.com/finos/finos-landscape)

# finos.github.io
Welcome to the FINOS Foundation Catalogue!

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

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Read our [contribution guidelines](.github/CONTRIBUTING.md) and [Community Code of Conduct](https://www.finos.org/code-of-conduct)
4. Commit your changes (`git commit -am 'Add some fooBar'`)
5. Push to the branch (`git push origin feature/fooBar`)
6. Create a new Pull Request

_NOTE:_ Commits and pull requests to FINOS repositories will only be accepted from those contributors with an active, executed Individual Contributor License Agreement (ICLA) with FINOS OR who are covered under an existing and active Corporate Contribution License Agreement (CCLA) executed with FINOS. Commits from individuals not covered under an ICLA or CCLA will be flagged and blocked by the FINOS Clabot tool. Please note that some CCLAs require individuals/employees to be explicitly named on the CCLA.

*Need an ICLA? Unsure if you are covered under an existing CCLA? Email [help@finos.org](mailto:help@finos.org)*


## License

Copyright 2019 - FINOS

Distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

SPDX-License-Identifier: [Apache-2.0](https://spdx.org/licenses/Apache-2.0)
