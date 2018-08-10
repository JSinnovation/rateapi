const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyname: {type: String},
    address: {type: String, default: ''},
    city: {type: String, default: ''},
    state: {type: String, default: ''},
    zipcode: {type: String, default: ''},
    country: {type: String, default: ''},
    sector: {type: String, default: ''},
    website: {type: String, default: ''},
    adminUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    imageId: {type: String, default: ''},
    imageVersion: {type: String, default: ''},
    //below the values in the rating array are KEYS
    rating: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        culture: {type: Number, default: 0},
        benefits: {type: Number, default: 0},
        balance: {type: Number, default: 0},
        speed: {type: Number, default: 0},
        review: {type: String, default: ''},
        userOverall: {type: Number, default: 0},
        created: {type: Date, default: Date.now}
    }],
    totalStars: {type: Number, default: 0},
    ratingOverall: [Number],
    cultureTotal: [Number],
    benefitsTotal: [Number],
    balanceTotal: [Number],
    speedTotal: [Number],
   employees: [{
      employee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
   }]
});

module.exports = mongoose.model('Company', companySchema);