
const  express  = require('express');
require("./database/config");
const { cloudinary } = require('./database/cloudinary-config');
const User = require('./models/User')
const Experience = require('./models/Experience')
var cors = require('cors');
const res = require('express/lib/response');


const  app  = express();
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


// Option 3: Passing parameters separately (other dialects)

  User.hasMany(Experience,{  foreignKey: 'user_id'});
  //{where:{id:1},include:[{model:Experience}]}

  app.get('/api/user',(req,res)=>{
    User.findAll({where:{id:1},include:[{model:Experience}]}).then(users => {
      res.json(users);
  }).catch(e =>{
      console.log(e);
  });

  })
  
   

  app.post('/api/upload',async (req, res) => {
    try {
      const fileStr = req.body.file;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'testData',
      });
      console.log(uploadResponse);
      res.json({ reponse: uploadResponse});
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
    }
});
const uploadImage = async evt => {
  try {
    const fileStr = evt;
    console.log("req data",fileStr)
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'testData',
    });
    return uploadResponse.url 
  } catch (err) {
    console.error(err);
    return err;
  }
}

app.post('/api/update',async (req,res)=>{
  try {
console.log(req.body)
let data=req.body;
let response
await User.update({name:data.name,profile_picture:data.profile_picture,age:data.age},{where: { id: data.id }})
 let experiances =await multipleUpdate(data.Experiences)
 if(experiances){
  response=await getUserData();
  res.json(response);
 console.log("dataaa",response);
 }
  
  } catch (err) {
  res.json(err);
  }
})
 testFunc =async ()=>{
  try {
    const uploadResponse = await cloudinary.uploader.destroy('/testData/grd3_ghaznp.png', {
        upload_preset: 'testData',
    });
    console.log("err",uploadResponse)
  } catch (err) {
    console.log("err",err)
  }

}
multipleUpdate = async (data) => {

  // const promises = [];
  // //  ^^^^^−−−−−−−−−−−−−−−−−−−−−−−−−−− use `const` or `let`, not `var`
  // for (let i = 0; i <= data.length; i++) {
  //   //       ^^^−−−−−−−−−−−−−−−−−−−−−−−− added missing declaration
  //   if(data[i].id){
  //     promises.push(Experience.update({start_date:data[i].start_date,end_date:data[i].end_date,job_title:data[i].job_title,company:data[i].company,company_logo:data[i].company_logo,job_description:data[i].job_description,user_id:data[i].user_id},{where: { id: data.id }}));
  //   }
  //   else{
  //     promises.push(Experience.create({start_date:data[i].start_date,end_date:data[i].end_date,job_title:data[i].job_title,company:data[i].company,company_logo:data[i].company_logo,job_description:data[i].job_description,user_id:data[i].user_id}));
  //   }
            
  //       }
        
  //     return new Promise.all(promises)
  //           .then((res) => {
  //               resolve(res)
  //                   console.log("resssss",res)
  //           })
  //           .catch((e) => {
  //               // handle errors here
  //           });
 
 try {
  let datadeleted= await cleanTable();
    if(datadeleted.status){
     let newDataAdded=await Experience.bulkCreate(data);
     return {status:true,data:newDataAdded}
    }
} catch (err) {
  console.log("err",err)
  return {status:false,message:err}
}
  // return new Promise((resolve,reject)=>{
  //   Experience.bulkCreate({start_date:data[i].start_date,end_date:data[i].end_date,job_title:data[i].job_title,company:data[i].company,company_logo:data[i].company_logo,job_description:data[i].job_description,user_id:data[i].user_id}).then(res => {
  //     resolve(res)
  //   }).catch((err)=>{
  //     reject(err)
  //   })
  // })
};
cleanTable =async ()=>{
  try {
    const dataDeleted = await Experience.destroy({where: {},truncate: true})
    console.log("res",dataDeleted)
    return {status:true,data:dataDeleted}
  } catch (err) {
    console.log("err",err)
    return {status:false,message:err}
  }

}
// cleanTable=()=>{
 
//   Experience.destroy({where: {},truncate: true}).then((res)=>{
//       console.log("resolved",res)
//       return json({data:res})
//    }).catch((err)=>{
//     console.log("resolved",err)
//     return status(500).json({err})
//   })

// }
getUserData = () =>{
  return new Promise((resolve,reject)=>{ User.findAll({where:{id:1},include:[{model:Experience}]}).then(response => {
    
    if(response){
      resolve(response)

    }
    else{
      reject(response)
    }
  })})
}
 syncing =async ()=>{
  await sequelize.sync({ force: true });
}
  // testFunc()
  //syncing()
  app.listen(8000);
  
  
  // User.create({name:"Asad",profile_picture:"https://res.cloudinary.com/dhhs6hvg7/image/upload/v1651508719/testData/1642141451497_slvxc8.jpg",age:'28'}).then(async (user)=>{
  //   console.log(user);
  //   const exp = await Experience.create({start_date:Date.now(),end_date:null,job_title:'Angular Developer',company:'3s Solutions',company_logo:null,public_id:null,img_url:"https://res.cloudinary.com/dhhs6hvg7/image/upload/v1651506631/testData/grd3_ghaznp.png",job_description:"xyz",user_id:user.id});
  //   console.log(exp);
  // }).catch(e => {
  //   console.log(e);
  // });
  // Experience.update({start_date:Date.now(),end_date:null,job_title:'Angular Developer',company:'3s Solutions',company_logo:"https://res.cloudinary.com/dhhs6hvg7/image/upload/v1651506631/testData/grd3_ghaznp.png",job_description:"xyzzz",user_id:1}).then( (user)=>{
  //   console.log("update",user);
  // },{where: { id: 1 }}).catch(e => {
  //   console.log("error",e);
  // });
  // Experience.destroy({ where: { id: 1 } });
  
  // Experience.destroy({
  //   where: {
  //     id: 1
  //   },
  //   force: true
  // });
  // Experience.destroy({
  //   where: {
  //     id: 2
  //   },
  //   force: true
  // });
  //sequelize.drop(); //delete all table if single table write table name and drop