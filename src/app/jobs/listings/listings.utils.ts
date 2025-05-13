export type JobStatus = 'live' | 'closed' | 'not_approved';

export const getStatusLabel = (status: JobStatus) => {
  switch (status) {
    case 'live':
      return { label: 'Live', color: 'text-green-600 bg-green-100' };
    case 'closed':
      return { label: 'Closed', color: 'text-red-600 bg-red-100' };
    case 'not_approved':
      return { label: 'Not Approved', color: 'text-orange-600 bg-orange-100' };
    default:
      return { label: 'Unknown', color: 'text-gray-600 bg-gray-100' };
  }
};
