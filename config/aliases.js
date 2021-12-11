const path = require('path')

const aliases = [
    'lib',
    'store',
    'actions',
    'routes',
    'components',
    'constants',
    'assets',
].reduce((acc, it) => ({
    ...acc,
    [`@${it}`]: path.resolve(__dirname, '../src', it),
}), {})

module.exports = aliases
