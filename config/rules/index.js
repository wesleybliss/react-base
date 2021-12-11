const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(__dirname, 'utf8')

const excludeIndex = file => {
    const fileName = path.basename(__filename)
    return file !== fileName
}

const requireFile = file => {
    const filePath = path.resolve(__dirname, file)
    return [require(filePath)]
}

const mergeRules = rule => rule

module.exports = files
    .filter(excludeIndex)
    .flatMap(requireFile)
    .flatMap(mergeRules)
