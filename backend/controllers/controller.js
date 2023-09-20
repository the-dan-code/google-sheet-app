import appUserDatas from '../models/app-user-data-model.js';
import mongoose from 'mongoose';

// get all app data
const getAllAppUserData = async (req, res) => {
    const appUserData = await appUserDatas.find({}).sort({createdAt: -1})
    res.status(200).json(appUserData)
}


// get a single data
const getSingleAppUserData = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No Such User"})
    }

    const appUserData = await appUserDatas.findById(id)
    if(!appUserData){
        return res.status(400).json({error: "No Such User"})
    }
    res.status(200).json(appUserData)  
}

// create a new data 

const createAppUserData = async (req, res) => {
    const { email, name, role, sheet_url } = req.body

    let emptyFields = []

    if (!email) {
        emptyFields.push('email')
    }
    if (!name) {
        emptyFields.push('name')
    }
    if (!role) {
        emptyFields.push('role')
    }
    if (!sheet_url) {
        emptyFields.push('sheet_url')
    }

    if (emptyFields.length) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const appUserData = await appUserDatas.create({ email, name, role, sheet_url })
        res.status(200).json(appUserData)
    } catch (error) {
        res.status(400).json({ error: error.message })  
    }
}

// delete a data 
const deleteAppUserData = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No Such User"})
    }

    const appUserData = await appUserDatas.findOneAndDelete({ _id: id })

    if(!appUserData){
        return res.status(400).json({error: "No Such User"})
    }
    res.status(200).json(appUserData)
}

// update a data
const updateAppUserData = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No Such User"})
    }

    const appUserData = await appUserDatas.findOneAndUpdate({ _id: id }, {...req.body})

    if(!appUserData){
        return res.status(400).json({error: "No Such User"})
    }
    res.status(200).json(appUserData)
}

export { getAllAppUserData, getSingleAppUserData, createAppUserData, deleteAppUserData, updateAppUserData }