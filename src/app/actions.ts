'use server';

import { prisma } from '@/lib/prisma';

export async function submitLead(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;

    if (!name || !phone) {
      return { success: false, error: 'Name and Phone are required.' };
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        location: location || 'Unknown',
      },
    });

    console.log('New lead captured:', lead);
    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error: 'Failed to submit the request. Please try again later.' };
  }
}
