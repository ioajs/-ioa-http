import ioa from 'ioa';

const app = ioa.app();

app.component("@ioa/config");
app.component("./lib");

app.import({
  "router": {
    "level": 50
  },
})