module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  // setupFiles: [
  //   './node_modules/react-native-gesture-handler/jestSetup.js',
  //   './jest/setup.ts',
  // ],
};
