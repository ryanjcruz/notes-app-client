import config from '../config.js';

// call invokeApig passing the only required params, and userToken
// returns result as json
// we concat the path to the gateway URL as it already has the "/" from it i.e /notes
export async function invokeApig ({ path, method='GET', body}, userToken) {
  const url = `${config.apiGateway.URL}${path}`;
  const headers = {
    Authorization: userToken,
  };

  body = (body) ? JSON.stringify(body) : body;

  const results = await fetch(url, {
    method,
    body,
    headers,
  });

  if (results.status !== 200) {
    throw new Error(await results.text());
  }

  return results.json();
}