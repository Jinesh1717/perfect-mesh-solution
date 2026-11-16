import { prisma } from '@/lib/prisma';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  try {
    const rawLeads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const serializedLeads = rawLeads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      location: lead.location,
      createdAt: lead.createdAt.toISOString(),
    }));

    return <AdminDashboard leads={serializedLeads} />;
  } catch (error) {
    console.error('Failed to query leads on /admin (e.g. database uninitialized):', error);
    return <AdminDashboard leads={[]} />;
  }
}
