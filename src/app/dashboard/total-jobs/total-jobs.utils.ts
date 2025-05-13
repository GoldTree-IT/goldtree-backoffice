import dayjs from 'dayjs';

type JobStatsParamsType = {
  totalJobs: number;
  liveJobs: number;
  closedJobs: number;
  lastUpdatedOn: string;
};

export const formatDate = (dateStr: string, fallback = 'Not available') => {
  if (!dateStr) {
    return fallback;
  }

  return dayjs(dateStr).format('MMMM D, YYYY');
};

export const parseJobStats = (data: JobStatsParamsType) => {
  const {
    totalJobs = 0,
    liveJobs = 0,
    closedJobs = 0,
    lastUpdatedOn = '',
  } = data || {};

  const jobStats = [
    { title: 'Total Jobs', count: totalJobs },
    { title: 'Live Jobs', count: liveJobs },
    { title: 'Closed Jobs', count: closedJobs },
  ];

  return {
    jobStats,
    lastUpdatedOn,
  };
};
