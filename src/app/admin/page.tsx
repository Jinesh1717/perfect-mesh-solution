import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">View all leads captured from the "Get In Touch" contact form.</p>
        
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-sm uppercase tracking-wider">
                  <th className="p-4 text-gray-400 font-medium">Name</th>
                  <th className="p-4 text-gray-400 font-medium">Phone</th>
                  <th className="p-4 text-gray-400 font-medium">Location</th>
                  <th className="p-4 text-gray-400 font-medium">Time submitted</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No leads captured yet. Try submitting the contact form!</td>
                  </tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium">{lead.name}</td>
                      <td className="p-4 text-gray-300">
                         <a href={`tel:${lead.phone}`} className="hover:text-white hover:underline">{lead.phone}</a>
                      </td>
                      <td className="p-4 text-gray-300">{lead.location}</td>
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
