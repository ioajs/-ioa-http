import ioa from 'ioa';
import loads from 'ioa-router/lib/loads.js';

const { app } = ioa;

app.emit('loads', loads);

app.loader({
   "koa.js": {
      "level": 100
   },
});