class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data) {
    try {
      if (!data){
        return console.log({ error: "Error! Create new  user, data can't be empty."})
      } 
      return await this.userRepository.createUser(data);
    } catch (error) {
      console.error(error);
    }
  }

 
  async updateUser(chatId, data) {
    try {
     
      if(!chatId) throw new Error("Identificador do chat não foi passado.")
      if(!data) throw new Error("Dados de atualização não foi definida")

      return await this.userRepository.updateUser(chatId, data);
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
