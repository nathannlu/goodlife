const User = require('../../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (args) => {
	try {
		const {
			email,
			password,
			password2
		} = args.userInput; // Retrieve values from arguments 

		// Check if user exists in database
		const existingUser = await User.findOne({email});
		if(existingUser) {
			throw new Error('User already exists!');
		}

		// Check if password is the same as confirm password
		if(password !== password2) {
			throw new Error('Passwords are inconsistent');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			email,
			password: hashedPassword
		}, (err) => { if (err) throw err});

		user.save();

		// If user is registered without errors
		// create a token
		const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

		return { token, password: null, ...user._doc } 
	}
	catch(err) {
		throw err;
	};
};

const login = async args => {
	try {
		const user = await User.findOne({email: args.email});
		if(!user) throw new Error('Email does not exist');

		const passwordIsValid = await bcrypt.compareSync(args.password, user.password);
		if(!passwordIsValid) throw new Error('Password incorrect');

		const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
		
		return { token, password: null, ...user._doc }
	}
	catch (err) {
		throw err;
	}
};

const verifyToken = async args => {
	try {
		const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
		const user = await User.findOne({_id: decoded.id})
		return { ...user._doc, password: null };
	}
	catch (err) {
		throw err;
	}
};

module.exports = { createUser, login, verifyToken }
