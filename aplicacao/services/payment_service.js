const { Client } = require("../../domain/entity/ClientMP");
const mp_checkstatus = require("../../interface/http/mp_checkstatus");
const { mp_makerequest } = require("../../interface/http/mp_makerequest");
const { mp_orderCancel } = require("../../interface/http/mp_pix_cancel");

class Payment {
  async createOrder() {
    try {
      const response = await mp_makerequest(Client);
      if (!response) return;
      const id = response.data.id;
      const qr_code =
        response.data.point_of_interaction.transaction_data.qr_code;
      return { id, qr_code };
    } catch (error) {
      console.error(error);
    }
  }

  async orderStatus(order_id) {
    try {
      return await mp_checkstatus(order_id);
    } catch (error) {
      console.error(error);
    }
  }

  async oderCancel(order_id) {
    return await mp_orderCancel(order_id);
  }
}

module.exports = { Payment };
