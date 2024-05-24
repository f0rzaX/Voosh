const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const username = req.query.username;
        if (username) {
            const user = await User.findOne({ username: username }).select('-password');
            if (!user?.profile?.isPublic) {
                if (req?.user?.role === 'admin' || req?.user.id == user._id) {
                    res.json(user.profile)
                }
                else {
                    res.json({
                        msg: "Private Profle"
                    })
                }
            } else {
                res.json({
                    msg: "User not found"
                })
            }
        } else {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user.profile)
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}

exports.updateProfile = async (req, res) => {
    const { photo, name, bio, phone, isPublic } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (photo) {
            user.profile.photo = photo
        };
        if (name) {
            user.profile.name = name
        };
        if (bio) {
            user.profile.bio = bio
        };
        if (phone) {
            user.profile.phone = phone
        };
        if (isPublic !== undefined) {
            user.profile.isPublic = isPublic
        };

        await user.save();

        res.json(user.profile);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const message = error.message.split(': ').pop();
            res.status(400).json({
                msg: message
            });
        } else {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
}

exports.getAllPublicProfiles = async (req, res) => {
    try {
        const users = await User.find({ 'profile.isPublic': true }).select('-password -_id -profile.isPublic')
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}

exports.getAllProfiles = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};