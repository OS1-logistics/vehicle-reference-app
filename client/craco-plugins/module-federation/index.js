const webpack = require('webpack');
const paths = require('react-scripts/config/paths');
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;

const getModuleFederationConfigPath = (additionalPaths = []) => {
  const path = require('path');
  const fs = require('fs');
  const appDirectory = fs.realpathSync(process.cwd());
  const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

  const moduleFederationConfigFiles = [
    'modulefederation.config.js',
    ...additionalPaths,
  ];
  return moduleFederationConfigFiles
    .map(resolveApp)
    .filter(fs.existsSync)
    .shift();
};

module.exports = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    const moduleFederationConfigPath = getModuleFederationConfigPath();

    if (moduleFederationConfigPath) {
      webpackConfig.output.publicPath = 'auto';

      const htmlWebpackPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
      );

      htmlWebpackPlugin.userOptions = {
        ...htmlWebpackPlugin.userOptions,
        publicPath: paths.publicUrlOrPath,
        excludeChunks: [require(moduleFederationConfigPath).name],
      };

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.container.ModuleFederationPlugin(
          require(moduleFederationConfigPath)
        ),
        new WebpackRemoteTypesPlugin({
          remotes: require(moduleFederationConfigPath).remotes,
          outputDir: 'node_modules/@types/header', // supports [name] as the remote name
          remoteFileName: 'types.tgz', // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
        }),
      ];
    }
    return webpackConfig;
  },
  overrideDevServerConfig: ({ devServerConfig }) => {
    devServerConfig.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    };

    return devServerConfig;
  },
};
