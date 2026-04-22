# taxi

## Deploy

Backend is ready for Render and frontend is ready for Vercel.

### Render backend

Create a Render web service from the `Backend` directory.

Set these env vars on Render:

- `NODE_ENV=production`
- `PORT=10000`
- `MONGODB_URI=...`
- `JWT_SECRET=...`
- `JWT_EXPIRES_IN=7d`
- `CORS_ORIGIN=https://your-frontend.vercel.app,https://*.vercel.app`
- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`
- `FIREBASE_DATABASE_URL=...`
- `FIREBASE_SERVICE_ACCOUNT_JSON=...`

### Vercel frontend

Create a Vercel project from the `frontend` directory.

Set these env vars on Vercel:

- `VITE_API_BASE_URL=https://your-render-service.onrender.com/api/v1`
- `VITE_BACKEND_ORIGIN=https://your-render-service.onrender.com`
- `VITE_SOCKET_URL=https://your-render-service.onrender.com`
- `VITE_ASSET_BASE_URL=https://your-render-service.onrender.com`
- `VITE_GOOGLE_MAPS_API_KEY=...`
- `VITE_CLOUDINARY_CLOUD_NAME=...`
- `VITE_CLOUDINARY_UPLOAD_PRESET=...`

If you use Vercel preview deployments, keep `https://*.vercel.app` in `CORS_ORIGIN` on Render so previews can call the backend without CORS failures.
