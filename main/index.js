import ioa from 'ioa';

const { app } = ioa;

app.use("@ioa/config");
app.use("./lib");

app.loader({
  "router": {
    "level": 50
  },
})