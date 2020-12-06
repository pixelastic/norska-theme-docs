module.exports = {
  extends: ['./node_modules/aberlaas/lib/configs/eslint.js'],
  overrides: [
    {
      files: ['src/**/*.js'],
      rules: {
        'node/no-unpublished-require': [
          'error',
          {
            allowModules: ['norska'],
          },
        ],
      },
    },
  ],
};
