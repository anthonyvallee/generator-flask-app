'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-flask-essentials-kit:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appName: 'flaskapp'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'setup.py'
    ]);
  });
});
