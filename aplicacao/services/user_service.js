class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user) {
    try {
      if (!user) return;
      const { id } = user;
      // Verifica se o usuário já existe
      const userExist = await this.getUserById(id);
      if (userExist.length) return;

      // Cria um novo usuário
      return await this.userRepository.createUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  async getUserById(id) {
    try {
      if (!id) return;

      return await this.userRepository.findById(String(id));
    } catch (error) {
      console.error(error);
    }
  }

  async inserInvitedUser(hosteUser, convidado_id) {
    try {
      if (!hosteUser || !convidado_id) return;
      if (typeof hosteUser == "number") {
        hosteUser = String(hosteUser);
      }
      if (typeof convidado_id == "number") {
        convidado_id = String(convidado_id);
      }

      // Verifica se o usuário já existe
      const checkInvitedExists = await this.getUserById(convidado_id);
      const checkHosterExist = await this.getUserById(hosteUser);
      if (checkInvitedExists && checkInvitedExists.length) return;
      if (!checkHosterExist.length) return;

      return await this.userRepository.insertAfiliate(
        checkHosterExist[0],
        convidado_id
      );
    } catch (error) {
      console.error(error);
    }
  }
  async updateUser(id, update) {
    try {
      if (!id || !update) return;
      if (typeof id == "number") {
        id = String(id);
      }
      const old_user = await this.getUserById(id);
      if (!old_user) return;
      return await this.userRepository.updateUser(id, update);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(id) {
    try {
      if (!id) return;
      return await this.userRepository.deleteUser(String(id));
    } catch (error) {
      console.error(error);
    }
  }

  async allUsersPaid() {
    try {
      return await this.userRepository.getAllUserPaid();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { UserService };
