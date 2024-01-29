const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const userModule = require('../model/user.module')

const uploadSchema = new Schema(
	{
		userId:{
            type: Schema.Types.ObjectId,
            ref: userModule.modelName
        },
        filename:{
            type: String
        },
        mimeType:{
            type:String
        },
        path:{
            type: String
        }
	},
	{ timestamps: true }
);

const uploadModel = db.model('upload', uploadSchema);

module.exports = uploadModel;
