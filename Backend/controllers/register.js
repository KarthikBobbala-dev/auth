const express = require('express');
const router = express.Router();
const db = require('../database/db');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
router.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            status:false,
            message:'All fields are required',
            data:null
        })
    }
    if(password.length !== 10){
        return res.status(400).json({
            status:false,
            message:'Password must be at least 10 characters long',
            data:null
        })
    }
    const query = 'INSERT INTO users (name,email,password) VALUES (?,?,?)';
    const values = [name,email,password];
    db.query(query,values,(err,result)=>{
        try {
        if(err) throw err;
        res.status(200).json({
            status:true,
            message:'User registered successfully',
            data: {name,email,password}
        });
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message:'Error registering user',
            error:error
        });
}});
});

router.post('/login',(req,res)=>{
    const {email,password} =  req.body;
    if(!email || !password){
        return res.status(400).json({
            status:false,
            message:'All fields are required',
            data:null
        })
    }
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email,password];
    db.query(query,values,(err,result)=>{
        try {
        if(err) throw err;
        if(result.length === 0){
            return res.status(401).json({
                status:false,
                message:'Invalid email or password',
                data:null
            })
        }
        const user = result[0];
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ status: true, message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message:'Error logging in',
            error:error.message
        })
    }
})
})

router.get('/dashboard',auth,(req,res)=>{
    res.status(200).json({
        status:true,
        message:'Dashboard',
        data:req.user
    })
})

module.exports = router;