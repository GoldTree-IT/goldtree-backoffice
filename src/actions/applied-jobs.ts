'use server';

export async function getAppliedJobs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/applied-jobs`, {
    method: 'GET',
    next: {
      tags: ['applied-jobs'],
      revalidate: 60 * 60 * 2,
    },
  });

  if (!response.ok) {
    console.error(`Failed to fetch jobs count: ${response.statusText}`);
    return {};
  }

  const result = await response.json();

  const data = result || {};

  return data;
}
