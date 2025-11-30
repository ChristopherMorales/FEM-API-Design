import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'
import { authenticateToken } from '../middleware/auth.ts'

const createHabitSchema = z.object({
  name: z.string(),
})

const completeParamsSchema = z.object({
  id: z.string().max(3),
})

const router = Router()

// Apply authentication to ALL routes in this router
router.use(authenticateToken)

router.get('/', (req, res) => {
  res.json({ message: 'habits' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'got one habbit' })
})

router.post('/', validateBody(createHabitSchema), (req, res) => {
  res.json({ message: 'created habbit' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'deleted habbit' })
})

router.post(
  '/:id/complete',
  validateParams(completeParamsSchema),
  validateBody(createHabitSchema),
  (req, res) => {
    res.json({ message: 'completed habbit' })
  }
)

export default router
