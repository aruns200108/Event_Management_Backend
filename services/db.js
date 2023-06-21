
//import mongoose
const mongoose = require('mongoose')

//define connection string using mongoose to connect with mongodb & node
// mongoose.connect('mongodb://localhost:27017/memories')
mongoose.connect('mongodb://127.0.0.1:27017/memories',{useNewUrlParser:true})


// ===============user[users]=====================
//create/model using mongoose to store document/data
const User = mongoose.model('User',{
    uname:String,
    pswd:String,
    mobile:Number,
    email:String
})


// ===============Admin [admins]=================
//create/modal using mongoose to storedocument/data
const Admin = mongoose.model('Admin',{
adminName:String,
adminPswd:String,
adminMobile:Number,
adminEmail:String,
adminimage:String
})

// =============bday AddItems[bdayitems]============
//create/modal using mongoose to storedocument/data
const Bdayitem = mongoose.model('Bdayitem',{
    id:String,
    theme:String,
    image:String,
    // dessert:String,
    // cake:String,
    budget:String
})

// =============newborn AddItems [newbornitems]============
//create/modal using mongoose to storedocument/data
const Newbornitem = mongoose.model('Newbornitem',{
    id:String,
    theme:String,
    image:String,
    budget:String
    // place:String
})

// =============ceremony AddItems [ceremonyitems]============
//create/modal using mongoose to storedocument/data
const Ceremonyitem = mongoose.model('Ceremonyitem',{
    id:String,
    theme:String,
    image:String,
    budget:String
    // place:String
})

// ==================Bdaybooking [bdaybookings]==============
//create/modal using mongoose to storedocument/data
const Bdaybooking = mongoose.model('Bdaybooking',{
    babyname:String,
    username:String,
    mobile:Number,
    email:String,
    address:String,
    doe:String,
    event:String,
    place:String,
    packag:String,
    fname:String,
    mname:String,
    dob:String,
    gender:String
})

// ==================newbornbooking [newbornbookings]==============
//create/modal using mongoose to storedocument/data
const Newbornbooking = mongoose.model('Newbornbooking',{
    babyname:String,
    username:String,
    mobile:Number,
    email:String,
    address:String,
    doe:String,
    event:String,
    place:String,
    packag:String,
    fname:String,
    mname:String,
    dob:String,
    gender:String
})

// =========================ceremonybooking [ceremonybookings]=================
const Ceremonybooking = mongoose.model('Ceremonybooking',{
    babyname:String,
    username:String,
    mobile:Number,
    email:String,
    address:String,
    doe:String,
    event:String,
    place:String,
    packag:String,
    fname:String,
    mname:String,
    dob:String,
    gender:String
})

//export model
module.exports ={
    User,
    Admin,
    Bdayitem,
    Bdaybooking,
    Ceremonyitem,
    Ceremonybooking,
    Newbornitem,
    Newbornbooking
 }