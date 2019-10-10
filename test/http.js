'use strict';

require('../index.js');
const test = require('jtf');
const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:8600';


test('get /', async t => {

   const { data } = await axios.get("/")

   t.deepEqual(data, 'hello ioa')

});


test('get /sms/:name/:sub', async t => {

   let { data } = await axios.get("/sms/sub/1232");

   t.deepEqual(data, {
      name: "sub",
      sub: "1232"
   })

});


test('post /login', async t => {

   const body = { id: '666', kk: '888' };

   const { data } = await axios.post("/login", body);

   t.deepEqual(data, {
      type: 'login',
      body
   })

});

test('get /user/:name', async t => {

   const { data } = await axios.get("/user/666")

   t.deepEqual(data, { name: "666" })

});
