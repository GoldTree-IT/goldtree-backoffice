import { getAppliedJobs } from '@/actions/applied-jobs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { JobList } from './components/job-list';
import { AppliedJobsList } from './components/jobs-applied';

export default async function JobsPage() {
  const jobsApplied = await getAppliedJobs();
  return (
    <main className="p-6 max-w-4xl">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="all">All Jobs Listing</TabsTrigger>
          <TabsTrigger value="applied">Applied Jobs Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Job Listings</CardTitle>
              <CardDescription>Browse available opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <JobList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applied">
          <AppliedJobsList jobs={jobsApplied?.data} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
