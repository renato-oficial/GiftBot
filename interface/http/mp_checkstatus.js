const axios = require("axios");
require("dotenv").config();
module.exports = async function mp_checkStatus(order_id) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `https://api.mercadopago.com/v1/payments/${order_id}`,
      headers: {
        Authorization: `Bearer ${process.env.MP_TOKEN}`,
      },
    })
      .then((response) => resolve(response.data.status))
      .catch((error) => reject(error));
  });
};
