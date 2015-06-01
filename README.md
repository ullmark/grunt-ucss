# grunt-ucss

> Run [ucss](https://github.com/oyvindeh/ucss) with grunt.

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

Let's you specify authentication to use. See [ucss auth documentation](https://github.com/oyvindeh/ucss#logging-in) for more details

#### pages.crawl
Type: `String`
Default value: `[]`

Specify a html-file to start crawling

#### pages.include
Type: `Array` of `String`
Default value: `[]`

Any extra pages not included in the crawl.

#### css 

Specify what css files to analyze

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## TODO
So, I started up this task and then abandoned it for a while... I've released this initial version just 
to get a version ppl can start using. I will add more test-cases and so on later on, and if you
got an idea or feature to add just tell med :)

## Release History
  - 0.1.0 - A first alpha version that prints unused selectors and their location in the css-files
  - 0.1.2 - Updated the README to remove text about *cleaned version*


[ucss]: https://github.com/oyvindeh/ucss
