// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/article-gateway', {
            // target: 'http://127.0.0.1:12080',
            target: 'http://s.lng168.com:12080',
            changeOrigin: true,
            // pathRewrite: {
            //     '^/gateway/gateway': '/gateway'
            // }
        })
    );
  // app.use(
  //   proxy('/xxx', {
  //     target: 'http://bbb:2000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/xxx': ''
  //     }
  //   })
  // );
};
