'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  // console.log('event details', JSON.stringify(event, undefined, 2));
  let metadata = event.Records[0].s3.object;
  console.log('object data', metadata);

  const bucket = event.Records[0].s3.bucket.name;
  // const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  // console.log('bucket & key', bucket, key);

  let s3object = await s3.getObject({ Bucket: bucket, Key: 'images.json' }).promise();
  console.log('image json', s3object);
  console.log('json', s3object.Body);
  console.log('data to string', s3object.Body.toString('utf-8'));
  console.log('data to json', JSON.parse(s3object.Body.toString('utf-8')));

  let imagesObject = JSON.parse(s3object.Body.toString('utf-8'));
  imagesObject.images.push(metadata);
  console.log('imagesObject post push', imagesObject);

  var base64data = new Buffer.from(JSON.stringify(imagesObject), 'binary');

  s3.putObject({
    Bucket: bucket,
    Key: 'images.json',
    Body: base64data,
    ACL: 'public-read'
  });
  // from: https://gist.github.com/homam/8646090

  console.log('bottom of index');

  return 'return lambda';
}