'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  // console.log('event details', JSON.stringify(event, undefined, 2));
  let metadata = event.Records[0].s3.object;
  console.log('object data', metadata);

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  console.log('bucket & key', bucket, key);

  const imageJson = await s3.getObject({ Bucket: bucket, Key: 'images.json' }).promise();
  console.log('image json', imageJson);
  console.log('json', imageJson.Body);
  console.log('data to string', imageJson.Body.toString('utf-8'));
  console.log('data to json', JSON.parse(imageJson.Body.toString('utf-8')));

  return 'return lambda';
}