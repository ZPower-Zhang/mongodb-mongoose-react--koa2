const mongoose = require('../db/index')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  date: {
    createAt: {
      type: Date,
      required: false,
      default: Date.now(),
      trim: true
    }
  }
})

const UsersModel = mongoose.model('Users', UserSchema, 'user')

class Mongodb {
  constructor() {

  }

  query(obj) {
    return new Promise((resolve, reject) => {
      UsersModel.find(obj, (err, doc) => {
        if (err) {
          reject(err)
          return
        }
        resolve(doc)
      })
    })
  }

  find(obj) {
    return new Promise((resolve, reject) => {
      UsersModel.find(obj, (err, doc) => {
        if (err) {
          reject(err)
          return
        }
        resolve(doc)
      })
    })
  }

  findOne(obj) {
    return new Promise((resolve, reject) => {
      UsersModel.findOne(obj, (err, doc) => {
        if (err) {
          reject(err)
          return
        }
        resolve(doc)
      })
    })
  }

  save(obj) {
    return new Promise((resolve, reject) => {
      let newUser = new UsersModel(obj)
      newUser.save((err, doc) => {
        console.log('err11')
        console.log(err)
        if (err) {
          console.log('err')
          console.log(err)
          reject(err)
          return
        }
        resolve(doc)
      })
    })
  }
}

module.exports = new Mongodb()
