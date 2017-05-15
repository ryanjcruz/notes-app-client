export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: 'uploads-notes-app'
  },
  apiGateway: {
    URL: 'https://u1wagfic06.execute-api.us-west-2.amazonaws.com/prod'
  },
  cognito: {
    USER_POOL_ID : 'us-west-2_nfABoROuE',
    APP_CLIENT_ID: 'uitt6bq2ippjlj13v1n43hu64',
    REGION: 'us-west-2',
    IDENTITY_POOL_ID: 'us-west-2:aa68a3ea-2eaa-444d-8ac8-9c167766eaf4'
  }
}