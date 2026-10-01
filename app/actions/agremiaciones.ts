'use server'

import prisma from '@/lib/prisma';

export async function getAgremiacionesList() {
  try {
    const agremiaciones = await prisma.agremiacion.findMany();
    return agremiaciones;
  } catch (e) {
    console.error('Error fetching agremiaciones:', e);
    return [];
  }
}
