const assert = require('assert')
const fs = require('fs')
const css2sass = require('../css2sass')

describe('test/css2sass.test.js', () => {
    var dir = '/Users/hefei/github/css2sass/test/'
    const sourcePath = dir + 'source1.css'
    const convertPath = dir + 'source1.sass'
    const targetPath = dir + 'target.sass'
    css2sass(sourcePath, convertPath)
    const convert = fs.readFileSync(convertPath).toString()
    const target = fs.readFileSync(targetPath).toString()
    it('power-assert', () => {
        assert(convert === target);
    });
})