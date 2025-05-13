'use server';

export async function getJobsCount() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin-dashboard-jobs-count`, {
    method: 'GET',
    next: {
      tags: ['jobs-count'],
      revalidate: 60 * 60 * 2,
    },
  });

  if (!response.ok) {
    console.error(`Failed to fetch jobs count: ${response.statusText}`);
    return {
      totalJobs: 0,
      liveJobs: 0,
      closedJobs: 0,
      lastUpdatedOn: '',
    };
  }

  const result = await response.json();

  const data = result || {
    totalJobs: 0,
    liveJobs: 0,
    closedJobs: 0,
    lastUpdatedOn: '',
  };

  return data;
}
