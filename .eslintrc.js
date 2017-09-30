module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
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
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': ['error', 'always'],
    //设置为0，表示忽略此规则
    'indent': 0,
    /** 
     * space-before-function-paren
     * default correct: test ()
     * 配置忽略空格：test()
     */
    'space-before-function-paren': 0, // 表示 忽略函数名称后面的空格 test()
    /**
     * keyword-spacing：空格
     * default correct: if () {}
     * 配置忽略if后空格: if() {}
     */
    'keyword-spacing': ['error', { 
      'overrides': {
        'if': { 'after': false }, // if后无括号
        'for': { 'after': false },
        'while': { 'after': false }
      } 
    }]
  }
}
