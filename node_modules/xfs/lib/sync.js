var fs = require('fs');
var path = require('path');

/**
 * [writeFile description]
 * @param {String} fpath filepath
 * @param {String}  data write to file
 * @param {Object}  [option] file option
 */
exports.writeFile = function (fpath, data, option) {
  var dir = path.dirname(fpath);
  this.mkdir(dir);
  fs.writeFileSync(fpath, data, option);
};

var rm_max = 10;
exports.rm = function (fpath) {
  var self = this;
  var count = 0;
  while (1) {
    var ff;
    try {
      ff = fs.readdirSync(fpath);
    } catch (e) {
      if (e.code === 'ENOENT') {
        return;
      } else if (e.code === 'ENOTDIR') {
        fs.unlinkSync(fpath);
        return;
      } else {
        throw e;
      }
    }
    if (ff.length <= 0) {
      return fs.rmdirSync(fpath);
    }
    ff.forEach(function (v) {
      self.rm(path.join(fpath, v));
    });
    count ++;
    if (count > rm_max) {
      throw new Error('rm dir failed:' + fpath);
    }
  }
};

exports.mkdir = function (fpath, mode) {
  var p = [];
  while (1) {
    try {
      fs.mkdirSync(fpath);
    } catch (e) {
      if (e.code === 'EEXIST') {
        break;
      } else if (e.code === 'ENOENT') {
        p.unshift(fpath);
        fpath = path.dirname(fpath);
      } else {
        throw e;
      }
    }
  }
  p.forEach(function (v) {
    fs.mkdirSync(v, mode);
  });
};

exports.copy = function (source, dest) {

};