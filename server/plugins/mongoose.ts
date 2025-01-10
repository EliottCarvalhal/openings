import { defineNitroPlugin } from 'nitropack/runtime/plugin'
import { connectToDatabase, disconnectFromDatabase } from '../utils/mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  // Connect when the server starts
  await connectToDatabase()

  // Disconnect when the server shuts down
  nitroApp.hooks.hook('close', async () => {
    await disconnectFromDatabase()
  })
})
