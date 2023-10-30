# playwrightTest

This repo provides auto tests for website "Redmine.com"

## To use these test you should download this repo and install some dependencies by Powershell

* To install PlayWright Framework
```
$ npm init playwright@latest --yes -- --quiet --browser=chromium --browser=firefox --browser=webkit --lang=js --gha
```
* To install rimraf (to delete directories with temp files)
```
$ npm install --save-dev rimraf
```
* To instal Allure reporter
```
$ npm install --save-dev allure-commandline
$ npm install --save-dev allure-playwright
```
* To install faker (random generator)
```
$ npm install @faker-js/faker --save-dev
```
## There are some commands to launch test

* To launch test in headed mode
```
$ npm run test
```
* To launch test is headless mode
```
$ npm run test:headless
```
* To launch allure reporter (json)
```
npm run test:reporter
```
* To convert json allure reporter to html and show it
```
npm run allure-report
```
# playwrightTest
