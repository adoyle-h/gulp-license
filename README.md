# gulp-license

> Add licenses to gulp stream.

> fork from https://github.com/terinjokes/gulp-license

## Installation

Install this package with npm and add it to your development dependencies:

`npm install --save-dev a-gulp-license`

## Usage

```javascript
var license = require('a-gulp-license');

gulp.task('license', function() {
  gulp.src('./lib/*.js')
    .pipe(license('MIT', {tiny: true}))
    .pipe(gulp.dest('./dist/'))
});
```
