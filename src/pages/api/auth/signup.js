import connectMongo from '../../../../database/connect'
import Users from '../../../../models/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req,res){
     await connectMongo().catch(error => res.json({error : "Connection failed"}));
    
    if(req.method==="POST")
    {
        //no body is present
        if(Object.keys(req.body)==0){
            return res.status(404).json({message : "Don't have form data"});
        }
        
        const {username,email,password} = req.body;

        //check duplicate users
        const checkexisting = await Users.findOne({email});
        if(checkexisting){
            return res.status(422).json({message : "User already exists"})
        }

        //hash password
        try {
            const encrypted = await hash(password, 10);
            const newUser = await Users.create({username, email, password : encrypted})
            return res.status(201).json({status : true, user : newUser})
        } catch (error) {
            return res.status(404).json({error})
        }
    }
    else{
        res.status(500).json({message : "HTTP method not valid"})
    }
}