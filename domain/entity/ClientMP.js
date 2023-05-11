module.exports.Client = {
  transaction_amount: 0.1,
  description: "Bot Sinais",
  payment_method_id: "pix",
  payer: {
    email: "test@gmail.com",
    first_name: "John",
    last_name: "Doe",
    identification: {
      type: "CPF",
      number: "19119119100",
    },
    address: {
      zip_code: "12345678",
      street_name: "Test street",
      street_number: "123",
      neighborhood: "Test neighborhood",
      city: "Test city",
      federal_unit: "Test state",
    },
  },
};
