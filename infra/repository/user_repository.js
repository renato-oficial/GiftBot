const { database } = require("../../prisma/prismaClient");



class UserRepository {

  createUser = async (data) => {
     return await database.user.create({
        data
    })
  };




  async updateUser(id, data) {
     return await database.user.update({
      where: { chatId : id },
      data
    })
  }

  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ id }, {}, function (err, numRemoved) {
        if (err) reject(err);
        resolve(numRemoved);
        // numRemoved = 3
        // All planets from the solar system were removed
      });
    });
  }

  async getAllUserPaid() {
    return new Promise((resolve, reject) => {
      this.db.find({ status: "paid" }, function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }
}

module.exports = {
  UserRepository,
};
