import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'

const router = Router()

// Apply authentication to ALL routes in this router
router.use(authenticateToken)

router.get('/', (req, res) => {
  res.json({ message: 'users' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'got user' })
})

router.put('/:id', (req, res) => {
  res.json({ message: 'user updated' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'deleted user' })
})

export default router
