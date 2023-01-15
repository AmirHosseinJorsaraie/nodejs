import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const router = Router()

router.get('/',createProxyMiddleware({
    target:'http://localhost:3000'
}))


export default router