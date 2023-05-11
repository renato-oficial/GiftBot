const axios = require("axios");
require("dotenv").config();

module.exports.mp_makerequest = function (client) {
  return axios.post("https://api.mercadopago.com/v1/payments", client, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.MP_TOKEN}`,
    },
  });
};
