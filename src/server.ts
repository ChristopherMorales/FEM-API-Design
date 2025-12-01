import express from 'express'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import habitRoutes from './routes/habitRoutes.ts'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { isTest } from '../env.ts'
import { errorHandler } from './middleware/errorHandler.ts'

// Create Express application
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json()) // You need this because when you intercept a request in the middleware you get it as a json and not a Binary
app.use(express.urlencoded({ extended: true })) // If you don't add this, you will have problems with query strings
app.use(
  morgan('dev', {
    skip: () => isTest(),
  })
)

// Health check endpoint - always good to have!
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Habit Tracker API',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/habits', habitRoutes)

app.use(errorHandler)
// Export the app for use in other modules (like tests)
export { app }

// Default export for convenience
export default app
