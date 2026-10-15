module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: 'off',
        'eol-last': 'off',
        'vue/valid-v-slot': 'off',
        'no-tabs': 'off',
        'no-irregular-whitespace': 'off',
        'no-useless-constructor': 'off',
        'vue/multi-word-component-names': 'off',
        'space-before-function-paren': 'off',
        camelcase: 'off',
        semi: 'off',
        'omma-dangle': 'off',
        quotes: 'off',
        'comma-dangle': 'off',
        'no-trailing-spaces': 'off',
        'quote-props': 'off'
    }
}
