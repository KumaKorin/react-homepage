import appRouter from './Routers/Router'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './Context/themeContext'

const App = () => (
    <ThemeProvider>
        <RouterProvider router={appRouter} />
    </ThemeProvider>
)

export default App
