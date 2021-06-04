import ioa from 'ioa';

const { app } = ioa;

app.component("./lib");

app.import({
   "config": false,
   "middleware": false,
})