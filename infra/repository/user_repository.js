const Datastore = require("nedb");
const path = require("path");

class UserRepository {
  constructor() {
    try {
      // Cria um novo datastore
      this.db = new Datastore({ filename: "users.db", autoload: true });
    } catch (error) {
      console.error(error);
    }
  }
  createUser = (object) => {
    return new Promise((resolve, reject) => {
      this.db.insert({ ...object }, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  };

  async findById(id) {
    return new Promise((resolve, reject) => {
      this.db.find({ id }, (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  async insertAfiliate(oldUser, newInvitedId) {
    return new Promise((resolve, reject) => {
      const _id = oldUser._id;
      this.db.update(
        { _id },
        { $addToSet: { afiliados: newInvitedId } },
        {},
        function (err, doc) {
          if (err) reject(err);
          resolve(doc);
        }
      );
    });
  }
  async updateUser(id, update) {
    return new Promise((resolve, reject) => {
      // Upserting a document
      this.db.update({ id }, { $set: update }, {}, function (err, numReplaced) {
        if (err) reject(err);
        resolve(numReplaced);
        // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
        // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
      });
    });
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
