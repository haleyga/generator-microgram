'use strict';
const Generator = require('yeoman-generator');
const chalk     = require('chalk');
const yosay     = require('yosay');

module.exports = class extends Generator {
    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.magenta('microgram') + ' generator!'
        ));

        const prompts = [
            {
                name:    'appName',
                message: `What's this thing called?`,
                default: 'uGram'
            },
            {
                name:    'initialVersion',
                message: `Initial version? `,
                default: '0.1.0'
            },
            {
                name:    'appDescription',
                message: 'Describe your project for me.',
                default: 'This is the awesomest app.'
            },
            // {
            //     name:    'testScript',
            //     message: 'What command will you run for testing?',
            //     default: 'npm run test'
            // },
            {
                name:    'author',
                message: `Let's not forget you! Who's the author here?`
            }
        ];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        this._writeConfigDir();
        this._writeLogsDir();
        this._writeSrcDir();
        this._writeStoreDir();
        this._writeTestDir();
        this._writeProjectRoot();
    }

    install() {
        this.installDependencies();
    }

    _writeConfigDir() {
        this.fs.copy(
            this.templatePath('config/_mdstyles.rb'),
            this.destinationPath('config/mdstyles.rb'));
    }

    _writeLogsDir() {
        this.fs.copy(
            this.templatePath('logs/_access.log'),
            this.destinationPath('logs/access.log'));
        this.fs.copy(
            this.templatePath('logs/_error.log'),
            this.destinationPath('logs/error.log'));
        this.fs.copy(
            this.templatePath('logs/_exception.log'),
            this.destinationPath('logs/exception.log'));
        this.fs.copy(
            this.templatePath('logs/_info.log'),
            this.destinationPath('logs/info.log'));
    }

    _writeSrcDir() {
        this.fs.copy(
            this.templatePath('src/_server.ts'),
            this.destinationPath('src/server.ts'));

        this.fs.copy(
            this.templatePath('src/config/_logger.config.ts'),
            this.destinationPath('src/config/logger.config.ts'));

        this.fs.copy(
            this.templatePath('src/controllers/_default.ts'),
            this.destinationPath('src/controllers/default.ts'));
        this.fs.copy(
            this.templatePath('src/controllers/_health.ts'),
            this.destinationPath('src/controllers/health.ts'));
        this.fs.copy(
            this.templatePath('src/controllers/_meta.ts'),
            this.destinationPath('src/controllers/meta.ts'));
        this.fs.copy(
            this.templatePath('src/controllers/_ping.ts'),
            this.destinationPath('src/controllers/ping.ts'));

        this.fs.copy(
            this.templatePath('src/models/_default.ts'),
            this.destinationPath('src/models/default.ts'));

        this.fs.copy(
            this.templatePath('src/services/_default.ts'),
            this.destinationPath('src/services/default.ts'));
    },

    _writeStoreDir() {
        this.fs.copy(
            this.templatePath('src/store/_store.ts'),
            this.destinationPath('src/store/store.ts'));
    },

    _writeTestDir() {
        this.fs.copy(
            this.templatePath('test/_default.ts'),
            this.destinationPath('test/default.ts'));
        this.fs.copy(
            this.templatePath('test/_health.ts'),
            this.destinationPath('test/health.ts'));
        this.fs.copy(
            this.templatePath('test/_meta.ts'),
            this.destinationPath('test/meta.ts'));
        this.fs.copy(
            this.templatePath('test/_ping.ts'),
            this.destinationPath('test/ping.ts'));
    }

    _writeProjectRoot() {
        this.fs.copy(
            this.templatePath('_.babelrc'),
            this.destinationPath('.babelrc'));
        this.fs.copy(
            this.templatePath('_.env.example'),
            this.destinationPath('.env.example'));
        this.fs.copy(
            this.templatePath('_.gitignore'),
            this.destinationPath('.gitignore'));
        this.fs.copy(
            this.templatePath('_.mdlrc'),
            this.destinationPath('.mdlrc'));
        this.fs.copy(
            this.templatePath('_.travis.yml'),
            this.destinationPath('.travis.yml'));
        this.fs.copy(
            this.templatePath('_LICENSE'),
            this.destinationPath('LICENSE'));
        this.fs.copy(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'));
        this.fs.copy(
            this.templatePath('_tsconfig.json'),
            this.destinationPath('tsconfig.json'));
        this.fs.copy(
            this.templatePath('_tslint.json'),
            this.destinationPath('tslint.json'));

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                appName:        this.props.appName,
                initialVersion: this.props.initialVersion,
                appDescription: this.props.appDescription,
                author:         this.props.author
            });
    }
};
