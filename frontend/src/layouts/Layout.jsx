import AdminLayout from './AdminLayout.jsx'
import MainLayout from './MainLayout.jsx'
import { isAdmin } from '../config/isAdmin.js'

export const Layout = isAdmin ? AdminLayout : MainLayout;