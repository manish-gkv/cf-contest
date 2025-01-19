const express = require('express');
const router = express.Router();
const User = require('../models/model.js');

router.get('/ping', (req,res)=>{
	res.status(201).json({message:'pong'});
})

router.post('/details', async (req, res) => {
    try {
        user = await User.find({ 'cf_user_name': req.body.user });
        if (user.length === 0) {
            const newUser = new User({
                cf_user_name: req.body.user,
                contest_ID: req.body.contestId
            });
            const nU = await newUser.save();
            res.status(201).json(nU);
        } else {
            const updatedUser = await User.updateOne({ cf_user_name: req.body.user },
                { $push: { contest_ID: req.body.contestId } } 
            );
            res.status(201).json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

module.exports = router;