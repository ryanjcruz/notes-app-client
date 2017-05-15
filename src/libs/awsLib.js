import config from '../config.js';
import AWS from 'aws-sdk';

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

// get Identity pool credentials to be used on uploading to AWS S3
export function getAwsCredentials(userToken) {
  const authenticator = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

  AWS.config.update({ region: config.cognito.REGION });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken
    }
  });

  return AWS.config.credentials.getPromise();
}


// file object and token as params
export async function s3Upload(file, userToken) {
  // call to get credentials
  await getAwsCredentials(userToken)

  const s3 = new AWS.S3({
    params: {
      Bucket: config.s3.BUCKET,
    }
  });
  
  // format filename
  const filename = `${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;

  // uploads to s3 with permission to public-read so we can download it later
  // returns promise object
  return s3.upload({
    Key: filename,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  }).promise();
}