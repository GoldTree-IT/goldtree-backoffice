'use client';

import { Button } from '@/components/ui/button';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusLabel } from '../listings.utils';
import { useJobListings } from '../services/use-job-listings';

type JobListing = {
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

type JobPage = {
  jobListings: JobListing[];
};

export const JobList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useJobListings();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const debouncedFetchNext = useCallback(() => {
    const handler = debounce(() => {
      if (hasNextPage) {
        fetchNextPage();
      }
    }, 300);
    handler();
  }, [fetchNextPage, hasNextPage]);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting && !isFetchingNextPage) {
        debouncedFetchNext();
      }
    },
    [debouncedFetchNext, isFetchingNextPage],
  );

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) {
      return;
    }

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 1,
    });

    observerRef.current.observe(node);

    return () => observerRef.current?.disconnect();
  }, [observerCallback]);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleDescription = (id: string) => {
    setIsDescriptionExpanded(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (isLoading) {
    return <p>Loading jobs...</p>;
  }

  if (isError) {
    return (
      <p>
        Error:
        {' '}
        {error.message}
      </p>
    );
  }

  return (
    <>
      {data?.pages?.flatMap((page: JobPage) =>
        page.jobListings.map((job: JobListing) => {
          const { label: statusLabel, color: statusColor } = getStatusLabel(job.status);

          return (
            <div key={job._id} className="border p-4 rounded shadow my-4 bg-white">
              <h3 className="font-semibold text-xl flex items-center gap-2">
                {job.job_title}
                <span className={`text-xs font-medium px-2 py-1 rounded ${statusColor}`}>
                  {statusLabel}
                </span>
              </h3>
              <p className="text-sm text-gray-500">
                {job.job_catagory}
                {' '}
                -
                {job.company_name}
              </p>
              <p>
                <strong>Location:</strong>
                {' '}
                {job.job_location}
              </p>
              <p>
                <strong>Salary:</strong>
                {' '}
                {job.salary}
              </p>
              <p>
                <strong>Experience Required:</strong>
                {' '}
                {job.exp_required}
              </p>
              <p>
                <strong>Education Preference:</strong>
                {' '}
                {job.edu_preferences}
              </p>

              <div className="mt-4">
                <strong>Skills:</strong>
                {' '}
                {job.skills.join(', ')}
              </div>

              <div className="mt-4">
                <strong>Job Description:</strong>
                <div className="mt-2">
                  <p
                    className={`text-sm ${isDescriptionExpanded[job._id] ? '' : 'line-clamp-3'}`}
                    dangerouslySetInnerHTML={{ __html: job.job_desc }}
                  />
                  <Button
                    type="button"
                    className="bg-white border-2 text-amber-500 mt-2 cursor-pointer"
                    onClick={() => toggleDescription(job._id)}
                  >
                    {isDescriptionExpanded[job._id] ? 'Show Less' : 'Show More'}
                  </Button>
                </div>
              </div>
            </div>
          );
        }),
      )}
      <div ref={loadMoreRef} className="h-2" />
      {isFetchingNextPage && <p className="text-bold text-amber-500">Loading ...</p>}
    </>
  );
};
