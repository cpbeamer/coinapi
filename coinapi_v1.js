const axios = require('axios');

const ISO_8601 = /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|[+-][01]\d:[0-5]\d)$/;
const transformResponse = axios.defaults.transformResponse.concat(function (data) {
    const tmp = function (item) { return Object.keys(item).forEach(function (k) {
        // console.log(item[k], ISO_8601.test(item[k]))
        if (ISO_8601.test(item[k])) {
            item[k] = new Date(Date.parse(item[k]));
        }
    }); };
    tmp(data);
    if (Array.isArray(data)) {
        data.forEach(tmp);
    }
    else {
        tmp(data);
    }
    return data;
});

const COIN_API_SDK = (function () {
    function COIN_API_SDK(api_key) {
        if (api_key === void 0) { api_key = null; }
        this.api_key = "A2C7D75A-9341-4C98-9C6E-E7AA0DDD719D";
        this.headers = {};
        this.url = "https://rest.coinapi.io";
        if (api_key) {
            this.api_key = api_key;
            this.headers = {
                "X-CoinAPI-Key": api_key
            };
            this.url = "https://rest.coinapi.io";
        }
    }
    COIN_API_SDK.prototype.exchange_rates_get_specific_rate = function (asset_id_base, asset_id_quote, time) {
        if (time === void 0) { time = null; }
        const path = this.url + ("/v1/exchangerate/" + asset_id_base + "/" + asset_id_quote);
        const params = {};
        if (time) {
            params.time = time.toISOString();
        }
        return axios.get(path, { headers: this.headers, transformResponse: transformResponse, params: params })
            .then(function (resp) {
            return resp.data;
        });
    };
});

