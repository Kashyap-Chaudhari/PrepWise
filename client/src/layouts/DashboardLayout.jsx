import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

