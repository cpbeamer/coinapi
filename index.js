const SDK = require("./coinapi_v1");

const sdk = new SDK("A2C7D75A-9341-4C98-9C6E-E7AA0DDD719D");

function run() {
  const t = new Date(Date.parse("2016-11-01T22:08:41+00:00"))

  sdk.exchange_rates_get_specific_rate("BTC", "USD", t).then(function (Exchange_rates_get_specific_rate) {
    console.log('Exchange_rates_get_specific_rate:');
    console.log(Exchange_rates_get_specific_rate) ;
  });
}

run();