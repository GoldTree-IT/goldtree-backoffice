'use server';

export async function getAppliedJobs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/expired-jobs`, {
    method: 'GET',
    next: {
      tags: ['expired-jobs'],
      revalidate: 60 * 60 * 2,
    },
  });

  if (!response.ok) {
    console.error(`Failed to fetch expired Jobs: ${response.statusText}`);
    return { };
  }

  const result = await response.json();

  const data = result || {};

  return data;
}
