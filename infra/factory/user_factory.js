const { UserService } = require("../../aplicacao/services/user_service");
const { UserRepository } = require("../repository/user_repository");

class UserFactory {
  constructor() {
    if (!UserFactory.instance) {
      UserFactory.instance = this;
    }
    return UserFactory.instance;
  }

  userService() {
    const user_repository = new UserRepository();
    return new UserService(user_repository);
  }
}

const userFactorySingleton = new UserFactory();
Object.freeze(userFactorySingleton);

module.exports = userFactorySingleton;
