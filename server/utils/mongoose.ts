import { useRuntimeConfig } from '#imports'
import mongoose from 'mongoose'

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(useRuntimeConfig().mongoUri)
    console.log('Connected to database')
    return mongoose
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from database')
  } catch (error) {
    console.error(error)
    throw error
  }
}

