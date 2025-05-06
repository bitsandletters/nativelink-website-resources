import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { env, getRuntimeKey } from 'hono/adapter'
import { Buffer } from 'node:buffer';

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

async function getAshbyPostings(apiKey: string) {
  const basicAuthHeader = 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64');


  const url = 'https://api.ashbyhq.com/jobPosting.list';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: basicAuthHeader
    },
    body: JSON.stringify({listedOnly: true})
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}


app.get('/', async (c) => {
  const { ASHBY_API_KEY } = env<{ ASHBY_API_KEY: string }>(c);
  console.log(ASHBY_API_KEY);

  if(!ASHBY_API_KEY) {
    return c.json({ message: 'No API key found' }, 500)
  }

  const data = await getAshbyPostings(ASHBY_API_KEY);  
  return c.json({ message: 'Hello Hono!', data })
})

export default handle(app)
