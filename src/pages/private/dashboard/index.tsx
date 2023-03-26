import { DashboardLayout } from 'containers';
import { Outlet } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
