npx @instructure/instui-cli create app --name MyInstuiApp
nvm alias default 10
cd MyInstuiApp
yarn
# https://www.gitpod.io/blog/gitpodify/#invalid-host-header
sed -i "/host: '0.0.0.0'/a \    \,disableHostCheck: true," webpack.config.js
