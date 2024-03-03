const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        uniqe: [true, "There is An Account Already Exsists for That Email"],
        validate: [isEmail, "Please Enter A Valid Email"],
    },
    password: {
        type: String,
        minLength: [6, "Password Must Be At Least 6 Characters"],
        required: [true, "Please Enter Your Password"]
    }
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;