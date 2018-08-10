const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    fullname: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type:String, default: ''},
    companies: [{
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
        }],
        imageId: {type: String, default: 'defaultPic.png'},
        imageVersion: {type: String, default: '1533738014'}
    });

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
} 
    module.exports =  mongoose.model('User',userSchema);
 