// 2021-03-26 jpsl - based on https://medium.com/@amcdnl/version-stamping-your-app-with-the-angular-cli-d563284bb94d
const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { resolve, relative } = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');

const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false
});

gitInfo.version = version;

/*
const fgtDsuWizardVersionFile = resolve(__dirname, '..', 'fgt-dsu-wizard', 'version.js');
fsExtra.writeFileSync(fgtDsuWizardVersionFile,
`// IMPORTANT: THIS FILE IS AUTO GENERATED BY bin/version.js - DO NOT MANUALLY EDIT OR CHECKIN!
const VERSION = ${JSON.stringify(gitInfo, null, 4)};

module.exports = VERSION;
`, { encoding: 'utf-8' });

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), fgtDsuWizardVersionFile)}`);
*/

const apiHubIndexHtmlFile = resolve(__dirname, '..', 'apihub-root', 'index.html');
fs.readFile(apiHubIndexHtmlFile, 'utf8', function (err, data) {
    if (err)
        return console.log(err);
    var result = data.replace(
        /<!-- VERSION_START -->.*<!-- VERSION_END -->/g,
        '<!-- VERSION_START -->'+gitInfo.version+"-"+gitInfo.hash+'<!-- VERSION_END -->');
    fs.writeFile(apiHubIndexHtmlFile, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), apiHubIndexHtmlFile)}`);