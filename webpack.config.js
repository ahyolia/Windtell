const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Supprimez les propriétés non reconnues
  if (config.devServer) {
    delete config.devServer._assetEmittingPreviousFiles;
  }

  return config;
};