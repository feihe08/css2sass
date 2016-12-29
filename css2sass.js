var fs = require('fs')
var path = require('path')

var regExp = {
  rule: /.+{(\n*|.*)*?}/g,
  statement: /([^;{}]*;)+?/g,
  comments: /\/\*([^\*\/])*\*\//g
}

function css2sass(sourcePath, targetPath) {
  if(!path.isAbsolute(sourcePath)){
    throw new Error('sourcePath shoule be sbaolute')
  }
  var source = fs.statSync(sourcePath)
  if(source.isFile()){
    if(!targetPath){
      targetPath = sourcePath.replace('.css', '.sass')
    }
  }else {
    throw new Error('sourcePath is not exist')
  }
  
  var buffer = fs.readFileSync(sourcePath)
  var ruleList = matchs(regExp.rule, buffer.toString())
  var resultList = ruleList.map( rule => convert(rule))
  var result = resultList.join('\n')
  fs.writeFileSync(targetPath, result)
}

function convert(rule) {
  var result = ''
  var selector = /[^{]*/.exec(rule)
  if (selector) {
    result += selector[0] + '\n'
  }
  var statements = matchs(regExp.statement, rule)
  var statements = statements.map(statement => {
    statement = statement.replace(';', '').replace(/ /g, '').replace(/\n/g, '')
    var arr = statement.split('*/')
    if (arr.length > 1) {
      arr[0] += '*/'
      arr[1] = '  ' + arr[1]
    }
    statement = arr.join('\n')
    if (statement.indexOf('\n') === -1) {
      statement = statement + '\n'
    }
    return '  ' + statement
  })
  return result + statements.join('')
}

function matchs(reg, str) {
  var result = []
  var match
  while (match = reg.exec(str)) {
    result.push(match[0])
  }
  return result
}

module.exports = css2sass
