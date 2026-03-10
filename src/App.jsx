import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PublicLayout from './components/PublicLayout';
import DashboardLayout from './components/DashboardLayout';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';

import SupplierDashboard from './pages/SupplierDashboard';
import ActiveProjects from './pages/ActiveProjects';
import ServicesManagement from './pages/ServicesManagement';
import ClientRequests from './pages/ClientRequests';
import Invoicing from './pages/Invoicing';
import InvoiceDetail from './pages/InvoiceDetail';

import BuyerDashboard from './pages/BuyerDashboard';
import BrowseServices from './pages/BrowseServices';
import MyProjects from './pages/MyProjects';

import Messages from './pages/Messages';
import ProjectWorkspace from './pages/ProjectWorkspace';

import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminProjects from './pages/AdminProjects';
import AdminInvoices from './pages/AdminInvoices';
import AdminServices from './pages/AdminServices';
import AdminCompliance from './pages/AdminCompliance';
import AdminSettings from './pages/AdminSettings';

import UserSettings from './pages/UserSettings';

function Scroll() { const { pathname } = useLocation(); useEffect(() => window.scrollTo(0, 0), [pathname]); return null; }

export default function App() {
  return (
    <>
      <Scroll />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route element={<DashboardLayout role="supplier" />}>
          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/projects" element={<ActiveProjects />} />
          <Route path="/supplier/services" element={<ServicesManagement />} />
          <Route path="/supplier/requests" element={<ClientRequests />} />
          <Route path="/supplier/invoicing" element={<Invoicing />} />
          <Route path="/supplier/invoicing/:id" element={<InvoiceDetail />} />
          <Route path="/supplier/messages" element={<Messages />} />
          <Route path="/supplier/workspace/:id" element={<ProjectWorkspace />} />
          <Route path="/supplier/settings" element={<UserSettings />} />
        </Route>

        <Route element={<DashboardLayout role="buyer" />}>
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/browse" element={<BrowseServices />} />
          <Route path="/buyer/projects" element={<MyProjects />} />
          <Route path="/buyer/invoices" element={<Invoicing />} />
          <Route path="/buyer/invoices/:id" element={<InvoiceDetail />} />
          <Route path="/buyer/messages" element={<Messages />} />
          <Route path="/buyer/workspace/:id" element={<ProjectWorkspace />} />
          <Route path="/buyer/settings" element={<UserSettings />} />
        </Route>

        <Route element={<DashboardLayout role="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/invoices" element={<AdminInvoices />} />
          <Route path="/admin/invoices/:id" element={<InvoiceDetail />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/compliance" element={<AdminCompliance />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  );
}
