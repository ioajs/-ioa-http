import ioa from 'ioa';

const { app } = ioa;

app.use("./lib");

app.loader({
   "config": false,
   "middleware": false,
})