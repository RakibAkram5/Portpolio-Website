import serverless from 'serverless-http'
import { createApp } from '../../src/app'

const app = createApp()

// Image responses (the profile photo) must be base64-encoded for the Lambda/Netlify runtime.
export const handler = serverless(app, { binary: ['image/*'] })
