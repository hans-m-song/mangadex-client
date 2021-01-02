const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');

const port = 3001;
const baseUrl = 'https://mangadex.org';
const apiPath = 'api';
const ajaxPath = 'ajax';

const create = () =>
  createProxyMiddleware({
    target: baseUrl,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  });

const app = express();

app.use(`/${apiPath}`, create());
app.use(`/${ajaxPath}`, create());

app.listen(port, () => console.log(`listening on port ${port}`));
