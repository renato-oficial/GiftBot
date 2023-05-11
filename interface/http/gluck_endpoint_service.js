const axios = require("axios");

let lastRoll = null;

const requestDoubleApi = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://gluck-backend-mfgep5u4mq-rj.a.run.app/games/double/history.php"
      )
      .then((response) => {
        const data = response.data[0];
        const isEqual = data?.id === lastRoll?.id;
        if (!isEqual) {
          lastRoll = data;
          resolve(lastRoll);
        }
      })
      .catch((err) => console.error(err));
  });
};

module.exports = {
  requestDoubleApi,
};
