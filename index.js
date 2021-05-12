'use strict';

const AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
  console.log('event details', JSON.stringify(event, undefined, 2));
  // let metadata = event.Records[0].s3.object;
  // console.log('object data', metadata);
  return 'return lambda';
}