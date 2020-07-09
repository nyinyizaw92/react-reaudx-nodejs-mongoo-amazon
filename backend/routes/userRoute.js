import express from 'express';
import User from '../model/userModel';
import { getToken } from '../util';
const router = express.Router();

router.post('/signin',async(req,res)=>{
    //console.log(req.body.email);
    const signinUser = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
   
    if(signinUser){
        console.log('singuse',signinUser);
        res.send({
            _id:signinUser._id,
            name:signinUser.name,
            email:signinUser.email,
            password:signinUser.password,
            isAdmin:signinUser.isAdmin,
            token:getToken(signinUser)
        })
    }else{
        res.status(401).send({
            msg:"invalid email or password"
        })
    }
})

router.post('/register',async(req,res) =>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    const newUser = await user.save();
    if(newUser){
        res.send({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            password:newUser.password,
            isAdmin:newUser.isAdmin,
            token:getToken(newUser)
        }) 
    }else{
        res.status(401).send({
            msg:"invalid user data"
        })
    }

})

router.get('/createadmin', async(req,res) =>{
    try {
        const user = new User({
            name:'nyinyi',
            email:'nyinyi@gmail.com',
            password:'123456',
            isAdmin:true
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({msg:error.message});
    }
})

export default router;