const corsAnywhere = require('cors-anywhere');

const host = '127.0.0.1';
const port = 8082;

corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
}).listen(port, host, () => {
  console.log(`CORS Proxy running on http://${host}:${port}`);
});