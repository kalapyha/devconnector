const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

//@route  POST api/users
//@desc   Register user
//@access Public
router.post(
	'/',
	[
		check('name', 'Name is required').trim().notEmpty(),
		check('email', 'Please include a valid email').trim().isEmail(),
		check(
			'password',
			'Please provide a valid password with 6 o more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// See if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({
					errors: [{ msg: 'User with this email address already exists' }],
				});
			}

			// Get users gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'retro',
			});

			user = new User({
				name,
				email,
				password,
				avatar,
			});

			// Encrypt password
			const salt = await bcrypt.genSaltSync(10);
			user.password = await bcrypt.hashSync(password, salt);

			await user.save();
			// Return jsonwebtoken

			res.sendStatus(200);
		} catch (error) {
			console.log(error);
			res.status(500).json({ errors: error });
		}
	}
);

module.exports = router;
