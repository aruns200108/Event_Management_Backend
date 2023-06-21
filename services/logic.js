//import model/collection from db.js
const db = require('./db')

//import jsonwebtoken
const jwt = require('jsonwebtoken')


// =============Register==========================

//define logic to resolve register requset 
 const register =(uname,pswd,mobile,email)=>{
  //check out mobile is existing in user collection of bank db
 return db.User.findOne({
    mobile
  }).then((result)=>{
    console.log(result);

//if mobile is exist send response as "user already exist" to client
if(result){
    return{
        statusCode:401,
        message:"user already exist"
    }
}
// if amobile dosnot exist create account memory db with database as its uname pswd and send response to register succesfull
 //to client
else{
    const newUser = new db.User({
        uname,
        pswd,
        mobile,
        email
    })
    //to store data in mongodb
    newUser.save()
    //send response to index.js
    return{
        statusCode:200,
        message:"Register successfully"
    }
 }
  })
}
 

// =========================logic========================

//define login to resolve login requset
 const login =(uname,pswd)=>{
    //to check uname & pswd is avalible in db
    return db.User.findOne({
        uname,
        pswd
    }).then((result)=>{
        // console.log(result);
        //user exist
        if(result){
            return{
                statusCode:200,
                message:"login successfull",
                //sending loginned username to frontend
                 currentUname:result.uname
                //sending loginned pswd to front end
//                 currentPswd:pswd
            }
        }
        else{
            return{
                statusCode:404,
                message:"Invalid Username/password"
            }
        }
    })
}


//=============================AdminRegister================

//define logic to resolve adminRegister requset
 const adminRegister = (adminName,adminPswd,adminMobile,adminEmail,adminimage)=>{
//check adminMobile is existing in admin collection of bank db
return db.Admin.findOne({
    adminMobile
 }).then((result)=>{
    console.log(result);

//if mobile is exist send response as "user already exist" to client
if(result){
        return{
            statusCode:401,
            message:"Admin already exist"
        }
    }

//if mobile is not exist create admin db with details as adminName,adminPswd,adminMobile,adminEmail 
//and send response to "register succesfully to client"
else{
    const newAdmin = new db.Admin({
        adminName,
        adminPswd,
        adminMobile,
        adminEmail,
        adminimage
    })
   // to store data in mongodb
    newAdmin.save()
    //send response to index.js
    return{
        statusCode:200,
        message:"Register successfully"
    }
}
})
}



/////===================================AdminLogin========================

//define logic to resolve adminlogin request
const adminLogin =(adminName,adminPswd)=>{
    return db.Admin.findOne({
        adminName,
        adminPswd
    }).then((result)=>{
       // user exist
        if(result){
    //  ======== generate token with payload as mobile=============
     const token = jwt.sign({
       adminlogin:adminName 
     },'supersecerateKey')


            return{
                statusCode:200,
                message:"Login successfully",
                 //sending loginned username to frontend
                  currentAname: result.adminName,
                //send token to clent
                token,
                //send admin name 
                currentAdminname:adminName 
            }
        }
        else{
            return{
                statusCode:404,
                message:"Invalid Username/password"
            }
        }
    })
}


// ===============================AddItem Bday======================

//define logic to resolve addItem request
const addItem = (id,theme,image,dessert,cake,budget)=>{
    //check id is existing in Bdayitem collection 
    return db.Bdayitem.findOne({
        id
    }).then((result)=>{
        console.log(result);

//if id is exist send response as "item  already exist" to client
    if(result){
       return{
        statusCode:401,
        message:"Item Id Already Exist"
       }
     }
 //if id is not exist create admin db with details as adminName,adminPswd,adminMobile,adminEmail 
//and send response to "register succesfully to client"
    else{
       const newBdayitem = new db.Bdayitem({
        id,
        theme,
        image,
        // dessert,
        // cake,
        budget
       })

       //to store data in mongodb
       newBdayitem.save()
       return{
        statusCode:200,
        message:"Item Added Successfully"
       }
      }   

    })

}

// ===============================AddItemnewborn======================

//define logic to resolve addItem request
const newbornAdd= (id,theme,image,budget)=>{
    //check id is existing in Bdayitem collection 
    return db.Newbornitem.findOne({
        id
    }).then((result)=>{
        console.log(result);

    // if id is exist send res "item already exist"
    if(result){
        return{
            statusCode:401,
            message:"Item Id Already Exist"
        }
    }
    //if id is not existing
    else{
        const newNewbornitem = new db.Newbornitem({
            id,
            theme,
            image,
            budget
            // place
        })
        //to store data in mongodb
        newNewbornitem.save()
        return{
            statusCode:200,
            message:"Item Added Successfully"
        }
    }
    })
}

// ===============================xceremonyAddItemn======================

//define logic to resolve addItem request
const ceremonyAdd = (id,theme,image,budget)=>{
    //check id is existing in Bdayitem collection 
    return db.Ceremonyitem.findOne({
        id
    }).then((result)=>{
        console.log(result);

    // if id is exist send res "item already exist"
    if(result){
        return{
            statusCode:401,
            message:"Item Id Already Exist"
        }
    }
    //if id is not existing
    else{
        const newCeremonyitem = new db.Ceremonyitem({
            id,
            theme,
            image,
            budget
            // place
        })
    //     //to store data in mongodb
        newCeremonyitem.save()
        return{
            statusCode:200,
            message:"Item Added Successfully"
        }
    }
     })
}


//======================add admin register to admin-dashboard(admin)=========
//adminregister to admindashboard
const getAdmin=()=>{
    return db.Admin.find({

    }).then((result)=>{
        return result
    })
}

// ==================Add bdayitem to Bday all item======================
    //additems to all-items
    const getItem=()=>{
        return db.Bdayitem.find({

        }).then((result)=>{
            return result
        })
    }


// ==========================Add newbornitem to newborn-items==========
//newbornadditems to newborn-items

const getNewbornItem=()=>{
    return db.Newbornitem.find({

    }).then((result)=>{
        return result
    })
}


// =========================Add ceremony t0 ceremony-items===========
const getCeremonyItem=()=>{
    return db.Ceremonyitem.find({

    }).then((result)=>{
        return result
    })
}
// ====================view bday======================
    //view product api
    const viewItem=(id)=>{
        return db.Bdayitem.findOne({
         id
        }).then((result)=>{
            return result
        })
    }
    // const viewItem = async(req,res)=>{
    //     const id = req.params.id
    //     try{
    //         const product = await item.findOne({id})
    //         res.status(200).json(item)
    //     }
    //     catch(error){
    //         res.status(401).json(error)
    //     }
    // }

// ==================delete account==========================
    ///deletemy account
    const deleteMyAccount = (adminacnt)=>{
        //adminacnt delete from mongo db
        return db.Admin.deleteOne({adminacnt})
        .then((result)=>{
            return{
                statusCode:200,
                message:"Deleting"
            }
        })
    }

// ------------------------------------------














// ===============================delete bday==========================
    ///deletemy bday item
    const deleteBdayItem = (bdayitem)=>{
        //adminacnt delete from mongo db
        return db.Bdayitem.deleteOne({bdayitem})
        .then((result)=>{
            return{
                statusCode:200,
                message:"Deleting...."
            }
        })
    }

//========================Bday booking=======================
//define logic to resolve booking req
const bdayBooking = (babyname,username,mobile,email,address,doe,event,place,packag,fname,mname,dob,gender)=>{
    return db.Bdaybooking.findOne({
        mobile
    }).then((result)=>{
        console.log(result);

        if(result){
            return{
                statusCode:401,
                message:"You Alredy booked"
            }
        }
        else{
            const newBdaybooking =new db.Bdaybooking({
                babyname,
                username,
                mobile,
                email,
                address,
                doe,
                event,
                place,
                packag,
                fname,
                mname,
                dob,
                gender
            })
            //to store data in mongodb
            newBdaybooking.save()
            return{
                statusCode:200,
                message:"Booked Successfully"
            }
        }
    })
}


//========================newborn booking=======================
//define logic to resolve booking req
const newbornBooking = (babyname,username,mobile,email,address,doe,event,place,packag,fname,mname,dob,gender)=>{
    return db.Newbornbooking.findOne({
        mobile
    }).then((result)=>{
        console.log(result);

        if(result){
            return{
                statusCode:401,
                message:"You Alredy booked"
            }
        }
        else{
            const newNewbornbooking =new db.Newbornbooking({
                babyname,
                username,
                mobile,
                email,
                address,
                doe,
                event,
                place,
                packag,
                fname,
                mname,
                dob,
                gender
            })
            //to store data in mongodb
            newNewbornbooking.save()
            return{
                statusCode:200,
                message:"Booked Successfully"
            }
        }
    })
}

// ============================ceremonybooking=======================
//define logic to resolve bookind req
const ceremonyBooking=(babyname,username,mobile,email,address,doe,event,place,packag,fname,mname,dob,gender)=>{
    return db.Ceremonybooking.findOne({
        mobile
    }).then((result)=>{
        console.log(result);

        if(result){
            return{
                statusCode:401,
                message:"You already booked"
            }
        }
        else{
            const newCeremonybooking = new db.Ceremonybooking({
                babyname,
                username,
                mobile,
                email,
                address,
                doe,
                event,
                place,
                packag,
                fname,
                mname,
                dob,
                gender
            })

            newCeremonybooking.save()
            return{
                statusCode:200,
                message:"Booked Successfully"
            }
        }
    })
}

// ===============get details of bday booking=======================
const getDetails =()=>{
    return db.Bdaybooking.find({

    }).then((result)=>{
        return result
    })
}


// ===============get details of newborn booking=======================
const getNewbornDetails =()=>{
    return db.Newbornbooking.find({

    }).then((result)=>{
        return result
    })
}

// ===============get deatails 0f cremony booking=============
const getCeremonyDetails=()=>{
    return db.Ceremonybooking.find({

    }).then((result)=>{
        return result
    })
}

// =============viewnewborn item=========================




//exports
module.exports = {
    register,
    login,
    adminRegister,
    adminLogin,
    addItem,
    newbornAdd,
    ceremonyAdd,
    getAdmin,
    getItem,
    getNewbornItem,
    getCeremonyItem,
    viewItem,
    deleteMyAccount,
    deleteBdayItem,
    bdayBooking,
    newbornBooking,
    ceremonyBooking,
    getDetails,
    getNewbornDetails,
    getCeremonyDetails
}