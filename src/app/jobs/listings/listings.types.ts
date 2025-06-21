export type AppliedJobList = {
  _id: string;
  status: string;
  jobDetails: {
    job_title: string;
    job_location: string;
    job_type: string;
    job_level: string;
    industry_type: string;
    salary: string;
    userId: string;
    company_name: string;
  };
};

export type AppliedJobListProps = {
  jobs: AppliedJobList[];
};

export type JobListing = {
  _id: string;
  job_title: string;
  job_catagory: string;
  company_name: string;
  job_location: string;
  salary: string;
  skills: string[];
  exp_required: string;
  edu_preferences: string;
  job_desc: string;
  job_spec: string;
  job_benifit: string;
  status: 'live' | 'closed' | 'not_approved';
};

export type JobPage = {
  jobListings: JobListing[];
};
