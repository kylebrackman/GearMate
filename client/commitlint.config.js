export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [1, 'always', Infinity],
    'subject-case': [2, 'always', ['sentence-case', 'lower-case']],
  },
};
