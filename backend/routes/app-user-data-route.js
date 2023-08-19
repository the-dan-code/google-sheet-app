import express from 'express';
import { getAllAppUserData, getSingleAppUserData, createAppUserData, deleteAppUserData, updateAppUserData } from '../controllers/controller.js'

const app_user_data_router = express.Router()

// get all app user data
app_user_data_router.get('/', getAllAppUserData)

// get single app user data
app_user_data_router.get('/:id', getSingleAppUserData)

// POST an app user data
app_user_data_router.post('/', createAppUserData)

// DELETE an app user data
app_user_data_router.delete('/:id', deleteAppUserData)

// UPDATE an app user data
app_user_data_router.patch('/:id', updateAppUserData)

export { app_user_data_router }