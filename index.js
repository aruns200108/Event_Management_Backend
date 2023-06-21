
//import expess
const express = require('express')

//import cors
const cors = require('cors')

//import logic.js
const logic = require('./services/logic');

//import jsonwebtoken
const jwt = require('jsonwebtoken')

//create server app using express in index.js
const server = express()


//jwt token





//usin cors specify the origin to server app that should share data
server.use(cors({
    origin:'http://localhost:4200'
}))

//use json parser in server app
server.use(express.json())

//setup port no for serverapp
server.listen(3000,()=>{
    console.log('server is listening at port no 3000');
})

//use application specific middleware
// server.use(appMiddleware)


//middleware for verifying token to check user is logined or not
const jwtMiddleware = (req,res,next)=>{
    console.log('......middleware.....');
    ///get token from req headers 
    const token = req.headers['access_token']
    console.log(token);
    try{
//verify token-verify()
const data = jwt.verify(token,'supersecerateKey')
console.log(data);
//to process client req
next()
    }
    catch{
res.status(401).json({message:"please login"})
    }
    
}

// ==========================register===========================

//register api-http request post('http://localhost:3000/register',body)
server.post('/register',(req,res)=>{
 console.log('inside register api');
 console.log(req.body);
 //get  uname,pswd,mobile,email
  logic.register(req.body.uname,req.body.pswd,req.body.mobile,req.body.email)
  .then((result)=>{
    //send result to client
     res.status(result.statusCode).json(result)
 // res.send('start to resolve register req')
 })
 })


//  ====================================login=========================

//login api- http request post('http://localhost:3000/login')
 server.post('/login',(req,res)=>{
    console.log('inside login api');
    console.log(req.body);

    //get uname,pswd
    logic.login(req.body.uname,req.body.pswd)
    .then((result)=>{
        //send result to client 
res.status(result.statusCode).json(result)
    })
})



// =======================adminRegister====================

//adminregister api-http requset post ('http://localhost:3000/adminRegister',body)
server.post('/adminRegister',(req,res)=>{
     console.log('inside admin register api');
     console.log(req.body);
    //get adminName,adminPswd,adminMobile,adminEmail
     logic.adminRegister(req.body.adminName,req.body.adminPswd,req.body.adminMobile,req.body.adminEmail,req.body.adminimage)
    .then((result)=>{
        //send result to client
     res.status(result.statusCode).json(result)

    })
})


// ==========================adminLogin=====================

//adminLogin api-http request post('http://localhost:3000/adminLogin',body)
server.post('/adminLogin',(req,res)=>{
    console.log('inside adminlogin api');
    console.log(req.body);
    //get adminName,adminPswd 
    logic.adminLogin(req.body.adminName,req.body.adminPswd)
    .then((result)=>{
        //send result to client
        res.status(result.statusCode).json(result)
    })
})

// ===========================add bdayitem=======================

//additem api - http requset post('http://localhost:3000/addItem',body)
//router specific middleware -JWTMiddleware 

server.post('/addItem',jwtMiddleware,(req,res)=>{
    console.log('inside addItem api');
    console.log(req.body);
    //get id,theme,image,dessert,cake,budget
    logic.addItem(req.body.id,req.body.theme,req.body.image,req.body.dessert,req.body.cake,req.body.budget)
    .then((result)=>{
    //send response to client
    res.status(result.statusCode).json(result)
    })
   
})

// ===========================add newbornitem=======================

//additem api - http requset post('http://localhost:3000/addItem',body)
server.post('/newbornAdd',jwtMiddleware,(req,res)=>{
    console.log('inside newbornaddItem api');
    console.log(req.body);
    //get id,theme,image,dessert,cake,budget
    logic.newbornAdd(req.body.id,req.body.theme,req.body.image,req.body.budget)
    .then((result)=>{
    //send response to client
    // res.send('start to resolve')
    res.status(result.statusCode).json(result)
    })
   
 })

 // ===========================add ceremonyitem=======================

//additem api - http requset post('http://localhost:3000/addItem',body)
server.post('/ceremonyAdd',jwtMiddleware,(req,res)=>{
    console.log('inside ceremonyaddItem api');
    console.log(req.body);
    //get id,theme,image,dessert,cake,budget
    logic.ceremonyAdd(req.body.id,req.body.theme,req.body.image,req.body.budget)
    .then((result)=>{
    //send response to client
    // res.send('start to resolve')
    res.status(result.statusCode).json(result)
    })
   
 })

 //===================add register admins=================
//admin register to admin-dashboard(admins)
server.get('/admin-register',(req,res)=>{
    logic.getAdmin().then((result)=>{
        res.json(result)
    })
})


// ===============add badyitems  to bday============================

//additems to all-item
server.get('/all-items',(req,res)=>{
    logic.getItem().then((result)=>{
        res.json(result)
    })
})


// =======================add newborn items to newbornitems===============
//newbornadditem to newbornitem
server.get('/newborn-items',(req,res)=>{
    logic.getNewbornItem().then((result)=>{
        res.json(result)
    })
})

// =========================addceremony items to ceremonyitems=================
server.get('/ceremony-items',(req,res)=>{
    logic.getCeremonyItem().then((result)=>{
        res.json(result)
    })
})

// ======================view bday==================
//view item
server.get('/view-bday/:id',(req,res)=>{
    console.log(req.params);
    logic.viewItem(req.params).then((result)=>{
        res.json(result)
    })
})

// ==================delet admin account====================

 //deleteMyAccount 
 server.delete('/delete-my-account',(req,res)=>{
    console.log('inside deleteMyAccount api');
    logic.deleteMyAccount(req.currentAdminname)
    .then((result)=>{
        //response send to client
        res.status(result.statusCode).json(result)
    })
 })

//  ===================bday delete item=====================
 //bdaydeleteitem
 server.delete('/delete-item',(req,res)=>{
    console.log('inside deleteMyAccount api');
    logic.deleteBdayItem(req.itemId)
    .then((result)=>{
        //response send to client
        res.status(result.statusCode).json(result)
    })
 })

//  =====================bday booking==========
    
//booking api http://localhost:3000/booking
server.post('/booking',(req,res)=>{
    console.log('Inside Booking Api');
    console.log(req.body);
    //get babname username.....
    logic.bdayBooking(req.body.babyname,req.body.username,req.body.mobile,req.body.email,req.body.address,req.body.doe,req.body.event,req.body.place,req.body.packag,req.body.fname,req.body.mname,req.body.dob,req.body.gender)
    .then((result)=>{
 //send res to client
 res.status(result.statusCode).json(result)
    })
})


// ======================newborn booking============================
//booking api http://localhost:3000/newbornbooking

server.post('/newbornbooking',(req,res)=>{
    console.log('inside newbornbooking api');
    console.log(req.body);
    //get bname username
    logic.newbornBooking(req.body.babyname,req.body.username,req.body.mobile,req.body.email,req.body.address,req.body.doe,req.body.event,req.body.place,req.body.packag,req.body.fname,req.body.mname,req.body.dob,req.body.gender)
    .then((result)=>{
    //send res to client
    res.status(result.statusCode).json(result) 
    })
})

// ===========================ceremonybooking=====================

server.post('/ceremonybooking',(req,res)=>{
    console.log('inside ceremony api');
    console.log(req.body);
logic.ceremonyBooking(req.body.babyname,req.body.username,req.body.mobile,req.body.email,req.body.address,req.body.doe,req.body.event,req.body.place,req.body.packag,req.body.fname,req.body.mname,req.body.dob,req.body.gender)
   .then((result)=>{

    //send res to client
    // res.send('start to resolve')
    res.status(result.statusCode).json(result)

   })

})

// ================get bday booking details to clientdetails===================

server.get('/clientdetails',(req,res)=>{
    logic.getDetails().then((result)=>{
        res.json(result)
    })
})


// ================get newbornbooking details to clientdetails===================

server.get('/clientnewborndetails',(req,res)=>{
    logic.getNewbornDetails().then((result)=>{
        res.json(result)
    })
})

// =====================get ceremonybooking details to clientdetails
server.get('/clientceremonydetails',(req,res)=>{
    logic.getCeremonyDetails().then((result)=>{
        res.json(result)
    })
})

