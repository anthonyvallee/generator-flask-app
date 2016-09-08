'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function() {

    this.log(`Generating a scaffold for based on ${ chalk.red('Flask App Kit') }.`);

    const DEFAULTS = {
      name: 'app',
      description: 'No description available right now.',
      author: 'Unknown',
      email: 'unknown@email.com',
      keywords: ''
    };

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is the name of the application (no spaces)?',
      default: DEFAULTS.name
    }, {
      type: 'input',
      name: 'description',
      message: 'What is the description of the application?',
      default: DEFAULTS.description
    }, {
      type: 'input',
      name: 'author',
      message: 'What is the name of the author?',
      default: DEFAULTS.author
    }, {
      type: 'input',
      name: 'email',
      message: 'What is the author\'s email?',
      default: DEFAULTS.email
    }, {
      type: 'input',
      name: 'keywords',
      message: 'What are the keywords for this project?',
      default: DEFAULTS.keywords
    }];

    return this.prompt(prompts).then(function(props) {
      this.props = props;
    }.bind(this));
  },

  writing: function() {

    const actions = [

      { templatePath: 'app/**', destinationPath: 'app', template: true },
      { templatePath: 'config/*', destinationPath: 'config', template: true },
      { templatePath: '.gitignore', destinationPath: '.gitignore', template: true },
      { templatePath: 'manage.py', destinationPath: 'manage.py', template: true },
      { templatePath: 'readmefile.md', destinationPath: 'README.md', template: true },

      { templatePath: 'instance/*', destinationPath: 'instance', template: false },
      { templatePath: 'tests/**', destinationPath: 'tests', template: false },
      { templatePath: 'LICENSE', destinationPath: 'LICENSE', template: false },
      { templatePath: 'requirements.txt', destinationPath: 'requirements.txt', template: false },
      { templatePath: 'setup.py', destinationPath: 'setup.py', template: true },

    ];

    actions.forEach((action) => {
      const templatePath = this.templatePath(action.templatePath);
      const destinationPath = this.destinationPath(action.destinationPath);
      if (action.template) this.fs.copyTpl(templatePath, destinationPath, this.props);
      else this.fs.copy(templatePath, destinationPath);
    });

  },

  end: function() {
    console.log();
    this.log(`Application (${ chalk.blue(this.props.appName) }) was successfully created.`);
    this.log(`A virtual environment should be created.`);
    this.log(`Then run ${ chalk.blue('pip install -r requirements.txt') } in the root directory to install project dependencies.`)
  }

});
