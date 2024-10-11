// export default {
//   extends: ['@commitlint/config-conventional'],
//   rules: {
//     'body-max-line-length': [1, 'always', Infinity],
//     'subject-case': [2, 'always', ['sentence-case', 'lower-case']],
//   },
// };

export default {
  rules: {
    'subject-empty': [0], // Disable subject-empty rule
    'subject-full-stop': [0], // Disable subject-full-stop rule
    'type-empty': [0], // Disable type-empty rule
  },
};
