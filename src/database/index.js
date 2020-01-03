import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// Importa todas as Models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

// Importa a configuração do banco
import databaseConfig from '../config/database';

// Array com as models
const models = [User, File, Appointment];

// Classe para iniciar as models
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // Variável que conecta no banco
    this.connection = new Sequelize(databaseConfig);

    // Map para carregar as models com a conexão e também os relacionamentos se tiverem
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
