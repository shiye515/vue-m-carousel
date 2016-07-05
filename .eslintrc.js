module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    'env': {
        'browser': true,
        'node': true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': 0,
        'semi': 0,
        'no-new': 0,
        'camelcase': 0,
        'indent': ['error', 4]
    }
}
