import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/css/styles.css"
import RecipesPage from './pages/recepies/recepies'
import CreateNewRecepies from './pages/recepies/createRecepies'
import { RouterProvider } from 'react-router'
import router from './routes/router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
