# grunt-ucss
note; not released to npm yet...

> Run [ucss](https://github.com/operasoftware/ucss) with grunt. Also adds the option to 
> create "cleaned" versions of the css-files with the unused css selectors removed.

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-ucss --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-ucss');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "ucss" task
The task can do two things; Analyze html+css using [ucss][] and print out any unused selectors
in the grunt log and use that information to create new clean

### Overview
In your project's Gruntfile, add a section named `ucss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ucss: {
    target: {
      options: {
        whitelist: ['.some-ok-selector'],
        auth: null
      },
      pages: {
        crawl: 'http://localhost/crawlstart',
        include: ['http://localhost/extra-not-reachable-by-crawl']
      },
      css: ['http://localhost/styles.css']
    }
  }
})
```

### Options

#### options.whitelist
Type: `Array` of `String`
Default value: `[]`

An array of selectors that should be 'white listed' meaning will not 
be listed or cleaned away even though it isn't used.

#### options.auth
Type: `Object`
Default value: `null`

Let's you specify authentication to use. See [ucss auth documentation](https://github.com/operasoftware/ucss#logging-in) for more details

#### html

Specify what html files analyze

#### css 

Specify what css files to analyze

#### dest

If you want the task to create *cleaned* versions of the css files
specify a directory here. Given an analyzed css named `styles.css` a file named 
`styles.clean.css` will be created in the directory.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## TODO
- Create ALOT of more test-cases.

## Release History
_(Nothing yet)_


[ucss]: https://github.com/operasoftware/ucss
