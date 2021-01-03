const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');

const port = 3001;
const baseUrl = 'https://mangadex.org';

const app = express();

app.use(
  `/`,
  createProxyMiddleware({
    target: baseUrl,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  }),
);

app.listen(port, () => console.log(`listening on port ${port}`));
