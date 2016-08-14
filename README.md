# coeus-project

Project Template for Coeus. A living welcome page is [here](http://103.238.224.51/).

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
npm run development
```
* Access to `http://localhost:3000`.

## Configuration

By default, the project provides two configuration for webpack. One is `webpack.development.js` used by the dev server, the other is `webpack.production.js`.

### For Development

As you can see in `webpack.development.js`, hot reload is on. If you use linux, hot loader may not work at the first time. A troubleshooting [here](https://webpack.github.io/docs/troubleshooting.html#not-enough-watchers) might help you.

### For Production

```shell
npm run build
```
No react, but [react-lite](https://github.com/Lucifier129/react-lite) recommended.

## Production Server

A default production server(powered by [koajs](http://koajs.com/)) is provided to response static resources and your coeus app.

```shell
npm run production
```

Additionally, as coeus's Router can not handle 404 land page correctly, some little logic is coded to handle 404 land page in server. If you ask why 404 land page can not be handled by Router, that's a good question and here is the answser:

>404 is a state in coeus's Router rather than a page, which is a good design to escape dummy traps allowing 404 path pushing in history. Well, a deeper concern is token into my account of course. I try to make coeus app be a true client application completely based on data state. That's the core. All components should work fine depending on state, a clear data structure which we can read and test easiy. Once coeus is loaded and up, all changes among components including errors and exceptions should be shown in state, not actions, not default pages, not conventional behaviors which is hard to be expected and controlled. Everything will be extremely clean and free if you expose some public data rather than some weird interfaces. So just expose state and listen to them. Components relate to each other in such a simple way!

The server is written simply as a demo now. And if you are looking for a manager to make server run in daemon which is a real demand in real production environment, [pm2](https://github.com/Unitech/pm2) is recommended.
