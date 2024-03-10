module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // use of drawer navigation brings in reanimated, which has this issue:
    // https://github.com/margelo/react-native-quick-crypto/issues/216
    // https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#step-2-add-reanimateds-babel-plugin
    plugins: ['react-native-reanimated/plugin'],
  };
};
