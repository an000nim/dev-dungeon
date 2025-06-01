/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@features': path.resolve(__dirname, 'src/modules/features'),
      '@shared': path.resolve(__dirname, 'src/modules/shared'),
    },
  },
  eslint: {
    enable: true,
    mode: 'extends', // используем конфиг из .eslintrc или package.json
  },
};
