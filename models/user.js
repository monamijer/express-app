const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {type: String, required: true, trim: true},
	lastname: {type: String, required: true, trim: true},
	email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "invalid Email"] },
	password: { type: String, required: true, minlength: 8, select: false },
	isConnected: { type: Boolean, default: false}
	
	},
	{
	timestamps: true,
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	});
userSchema.index({ email: 1});

userSchema.virtual("fullname").get(function(){
	return `${this.name} ${this.lastname}`;
});

userSchema.methods.toPublic = function(){
	return {
	  id: this._id,
	  fullname: this.fullname,
	  email: this.email,
	  isConnected: this.isConnected,
	};
};


module.exports = mongoose.model("User", userSchema);
