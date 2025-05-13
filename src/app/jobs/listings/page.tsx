import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export default function JobsPage() {
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
          <Card>
            <CardHeader>
              <CardTitle>Applied Jobs</CardTitle>
              <CardDescription>Jobs you’ve applied to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              <p>No applied jobs found yet.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary">Update Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
