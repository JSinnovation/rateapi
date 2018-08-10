const User = require('../models/user');
const Company = require('../models/company');

exports.createCompany = async (req, res) => {
    if(req.body.name === undefined || req.body.address === undefined ||  req.body.city === undefined ||req.body.state === undefined ||
        req.body.zipcode === undefined || req.body.country === undefined || req.body.sector === undefined || 
        req.body.website === undefined){
        return res.status(200).json({error: 'You cannot create company with empty fields'});
    }

    if(req.body.name === '' || req.body.address === '' || req.body.city === '' ||req.body.state === '' ||
    req.body.zipcode === '' || req.body.country === '' || req.body.sector === '' || req.body.website === ''){
        return res.status(200).json({error: 'You cannot create company with empty fields'});
    }
    console.log(req.body)

    const newCompany = new Company();
    newCompany.companyname = req.body.name;
    newCompany.address = req.body.address;
    newCompany.city = req.body.city;
    newCompany.state = req.body.state;
    newCompany.zipcode = req.body.zipcode;
    newCompany.country = req.body.country;
    newCompany.sector = req.body.sector;
    newCompany.website = req.body.website;
    newCompany.adminUser = req.body.userId;
  
    const company = await newCompany.save()
    const companyData = await newCompany.save();
    
    await User.update({
        '_id': req.body.userId
    }, {
        //update the company array with the company ID
        $push: {companies: {
            company: companyData._id
        }}
    }); 
    
    return res.status(500).json({message: 'Company created successfully'});
}

exports.getAllCompanies = async (req, res) => { //request response
    const results = await Company.find({}) //empty to return all documents in the collection
                            .populate("rating.user");//passing in rating.user replacing ID with the complete user data
                            //use password as the key and then set its value to 0 to exclude the password

    return res.status(200).json({result: results});
}

exports.addReview = async (req, res) => {
    
    if(req.body.culture === '' || req.body.benefits === '' || req.body.balance === '' 
    || req.body.speed === '' || req.body.review == '' || req.body.overall === ''){
        return res.status(500).json({error: 'No empty fields allowed'});
    }

    if(req.body.culture === undefined || req.body.benefits === undefined || req.body.balance === undefined 
    || req.body.speed === undefined || req.body.review == undefined || req.body.overall === undefined){
        return res.status(500).json({error: 'No empty fields allowed'});
    } 

     const company = await Company.update({
        "_id": req.body.companyId
    }, {
        //rating is the name of the field
        $push: {rating: {
            user: req.body.userId,
            culture: req.body.culture,
            benefits: req.body.benefits,
            balance: req.body.balance,
            speed: req.body.speed,
            review: req.body.review,
            userOverall: req.body.overall
        },
            ratingOverall: req.body.overall,
            cultureTotal: req.body.culture,
            benefitsTotal: req.body.benefits,
            balanceTotal: req.body.balance,
            speedTotal: req.body.speed
        },
        $inc: {totalStars: req.body.overall}
       
    }); 

   return res.status(200).json({message: 'Review added successfully'});
      
}

//search using the '_id'
exports.addEmployee = async (req, res) => {
    await Company.update({
        '_id': req.body.company._id,
        //make sure not alreaday registered
        //$ne not equal operator...not existing
        'employees.employee': {$ne: req.body.user._id}
    }, {
        $push: {employees: {
            employee: req.body.user._id
        }}
    });

    await User.update({
        '_id': req.body.user._id,
    }, {
        role: req.body.role
    });

    return res.status(200).json({message: 'Role added successfully.'});
}

exports.search = async (req, res) => {

    const searchName = req.body.company;
    //gi ignore case
    const regex = new RegExp(searchName, 'gi');
      //await bcs of async await
    const company = await Company.find({"companyname": regex});

  
    if(company.length > 0){
        return res.status(200).json({message: "Search Results", results: company});
    } else {
        return res.status(200).json({message: "Search Results", results: []});
    }
}
  


exports.leaderBoard = async (req, res) => {
    //find all companies{}
    const results = await Company.find({})
                        .sort({"totalStars": -1});
                        //-1 decending order
    return res.status(200).json({result: results}); 
 

}







































