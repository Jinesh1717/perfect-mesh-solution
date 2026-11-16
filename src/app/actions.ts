'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name cannot exceed 80 characters'),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+() -]{8,18}$/, 'Please enter a valid phone number (e.g. +91 98765 43210)'),
  location: z
    .string()
    .trim()
    .max(120, 'Location is too long')
    .optional()
    .default('Bengaluru (Unspecified)'),
  botTrap: z.string().optional(),
});

export async function submitLead(formData: FormData) {
  try {
    const rawData = {
      name: (formData.get('name') as string) || '',
      phone: (formData.get('phone') as string) || '',
      location: (formData.get('location') as string) || '',
      botTrap: (formData.get('botTrap') as string) || '',
    };

    // Spam honeypot: automated bots populate hidden fields
    if (rawData.botTrap && rawData.botTrap.trim().length > 0) {
      console.warn('Spam lead attempt blocked via honeypot.');
      return { success: true, leadId: 'filtered' };
    }

    const validation = leadSchema.safeParse(rawData);
    if (!validation.success) {
      const firstError = validation.error.issues?.[0]?.message || 'Invalid form input.';
      return { success: false, error: firstError };
    }

    const { name, phone, location } = validation.data;

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        location: location || 'Bengaluru',
      },
    });

    console.log('New lead captured successfully:', lead.id, lead.name);
    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error: 'Failed to submit request. Please call +91 70127 15025 directly.' };
  }
}
