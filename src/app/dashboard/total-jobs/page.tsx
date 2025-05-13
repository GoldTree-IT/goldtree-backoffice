import { getJobsCount } from '@/actions/total-jobs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate, parseJobStats } from './total-jobs.utils';

export default async function TotalJobs() {
  const totalJobsList = await getJobsCount();

  const { jobStats, lastUpdatedOn } = parseJobStats(totalJobsList);
  const formattedDate = formatDate(lastUpdatedOn);

  return (
    <div className="grid gap-4 md:grid-cols-3 m-4">
      {jobStats.map(({ title, count }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{`Number of ${title.toLowerCase()} on the platform.`}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{count}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Last job posted on:
              {' '}
              <span className="font-semibold">{formattedDate}</span>
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
