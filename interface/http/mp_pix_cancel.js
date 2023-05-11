const axios = require("axios");
require("dotenv").config();

module.exports.mp_orderCancel = function (order_id) {
  return new Promise((resolve, reject) => {
    let time = Date.now().toString();
    axios({
      method: "PUT",
      url: `https://api.mercadopago.com/v1/payments/${order_id}`,
      data: {
        status: "cancelled",
      },
      headers: {
        Authorization: `Bearer ${process.env.MP_TOKEN}`,
        timestamp: time,
      },
    })
      .then((response) => resolve(response.data.status))
      .catch((error) => reject(error));
  });
};
