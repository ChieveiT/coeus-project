# coeus-project

Project Template for Coeus

## Quick Start

* Download zip from the master branch.
* Unzip the project and rename the project to what you want.
* Install deps.
```shell
cd ${project_name}
npm install
```
* Run server for development.
```shell
npm run server
```
* Access to [the welcome page](http://localhost:3000).

## Default Configuration

By default, the project provides two configuration for webpack. One is `webpack.development.js` used by the dev server, the other is `webpack.production.js`.

### For Development

As you can see in `webpack.development.js`, hot reload is on. If you use linux, hot loader may not work at the first time. A troubleshooting [here](https://webpack.github.io/docs/troubleshooting.html#not-enough-watchers) might help you.

### For Production

```shell
npm run build
```
No react, but [react-lite](https://github.com/Lucifier129/react-lite).
