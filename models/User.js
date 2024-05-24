const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        uniqure: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        validate: {
            validator: function (v) {
                return this.googleId || v;
            },
            message: 'Password is required'
        }
    },
    profile: {
        photo: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: "",
            maxlength: [250, 'Bio cannot be more than 250 characters']
        },
        phone: {
            type: String,
            default: "",
            validate: {
                validator: function(v) {
                    if (!v) return true;
                    return /\d{10}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        isPublic: {
            type: Boolean,
            default: true
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    googleId: {
        type: String
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User;