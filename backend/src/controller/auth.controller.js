
const usermodale = require('../model/user.model');
const blacklisttokenmodel = require('../model/blacklist.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
};

const clearCookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
};

async function registerusercontroller(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'please enter username, email, password'
            });
        }

        const isalreadyexist = await usermodale.findOne({
            $or: [{ username }, { email }]
        });

        if (isalreadyexist) {
            return res.status(400).json({
                message: 'username or email already exist'
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await usermodale.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.jwt_secret,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, cookieOptions);

        return res.status(201).json({
            message: 'user created successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}

async function loginusercontroller(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'please enter email and password'
            });
        }

        const user = await usermodale.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'invalid email or password'
            });
        }

        const ispasswordvalid = await bcrypt.compare(
            password,
            user.password
        );

        if (!ispasswordvalid) {
            return res.status(400).json({
                message: 'invalid email or password'
            });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.jwt_secret,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            message: 'login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}

async function logoutusercontroller(req,res) {
    try {
        const token = req.cookies.token

        if(token){
            await blacklisttokenmodel.create({token})
        }
        res.clearCookie('token', clearCookieOptions)

        res.status(200).json({
            message : 'logout succsessfull'
        })
        
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message:'internal server error'
        })
        
    }
    
}

async function getmecontroller(req,res) {
    try {
        const user = await usermodale.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        res.status(200).json({
            message:'data fetched succsessfully',
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
            }
        })
        
    } catch (error) {
          console.log(error)

        return res.status(500).json({
            message:'internal server error'
        })
        
        
    }
    
}

module.exports = {
    registerusercontroller,
    loginusercontroller,
    logoutusercontroller,
    getmecontroller
};
