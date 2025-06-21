'use client';

import type { AppliedJobListProps } from '../listings.types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export function AppliedJobsList({ jobs }: AppliedJobListProps) {
  const isEmpty = jobs.length === 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applied Jobs</CardTitle>
        <CardDescription>Jobs you’ve applied to</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEmpty
          ? (
              <p>No applied jobs found yet.</p>
            )
          : (
              jobs?.map((job) => {
                const d = job.jobDetails;
                return (
                  <Card key={job._id}>
                    <CardHeader>
                      <CardTitle>{d.job_title}</CardTitle>
                      <CardDescription>
                        {d.company_name}
                        •
                        {d.job_location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>
                        <strong>Type: </strong>
                        {d.job_type}
                      </p>
                      <p>
                        <strong>Level: </strong>
                        {d.job_level}
                      </p>
                      <p>
                        <strong>Industry: </strong>
                        {d.industry_type}
                      </p>
                      <p>
                        <strong>Salary: </strong>
                        {d.salary}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Link
                        href={`/profile/${d.userId}`}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View Candidate Profile
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        <strong>Status: </strong>
                        {job.status}
                      </span>
                    </CardFooter>
                  </Card>
                );
              })
            )}
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Update Preferences</Button>
      </CardFooter>
    </Card>
  );
}
