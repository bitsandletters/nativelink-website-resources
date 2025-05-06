import { getAshbyPostings } from '../lib/ashby';
import { stringify } from 'csv-stringify/sync';
import fs from 'fs';
const ASHBY_API_KEY = process.env.ASHBY_API_KEY;

if (!ASHBY_API_KEY) {
  throw new Error('ASHBY_API_KEY is not set');
}

const response = await (getAshbyPostings(ASHBY_API_KEY) as Promise<{ success: boolean, results: any[] }>);

// console.log(response);
  
const output = response.results.map((posting: any) => ({
  title: posting.title,
  slug: `ashby-${posting.id}`,
  id: posting.id,
  jobId: posting.jobId,
  departmentName: posting.departmentName,
  teamName: posting.teamName,
  locationName: posting.locationName,
  workplaceType: posting.workplaceType,
  employmentType: posting.employmentType,
  isListed: posting.isListed ? 'Yes' : 'No',
  publishedDate: posting.publishedDate,
  updatedAt: posting.updatedAt,
  externalLink: posting.externalLink,
  applyLink: posting.applyLink,
}));

const csv = stringify(output, {
  header: true,
  columns: [
    'id',
    'title',
    'jobId',
    'departmentName',
    'teamName',
    'workplaceType',
    'employmentType',
    'locationName',
    'isListed',
    'publishedDate',
    'updatedAt',
    'externalLink',
    'applyLink',
  ],
});

console.log(csv);

fs.writeFileSync('postings.csv', csv);