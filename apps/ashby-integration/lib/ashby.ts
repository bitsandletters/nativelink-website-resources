export async function getAshbyPostings(apiKey: string) {
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