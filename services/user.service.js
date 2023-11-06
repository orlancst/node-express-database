const boom = require('@hapi/boom');

//const getConnection = require('../libs/postgres')
//const pool = require('../libs/postgres.pool');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async find() {

    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;

    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    // return rta.rows;


    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    // return rta.rows;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found.');
    }
    return user;
  }

  async update(id, changes) {
    //const user = await models.User.findByPk(id);

    //Reutilizar codigo de findOne:
    const user = await this.findOne(id);
    const rta = await user.update(changes);

    return rta;
  }

  async delete(id) {
    //Reutilizar codigo de findOne:
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
