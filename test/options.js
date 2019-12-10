'use strict';

const test = require('jtf');
const axios = require('axios');

test('options /', async t => {

   const { data } = await axios.options("/", {
      "headers": {
         "access-control-request-method": "GET"
      }
   });

   t.deepEqual(data, '');

});


// test('get /sms/:name/:sub', async t => {

//    const { data } = await axios.options("/sms/sub/1232");

//    t.deepEqual(data, {
//       name: "sub",
//       sub: "1232"
//    })

// });


// test('get /user/:name', async t => {

//    const { data } = await axios.options("/user/666");

//    t.deepEqual(data, { name: "666" });

// });
