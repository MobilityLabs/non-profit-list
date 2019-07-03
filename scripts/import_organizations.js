// @flow
require('dotenv').config({silent: true})
const _ = require('lodash')
const csv = require('csv')
const fs = require('fs')
const StreamConcat = require('stream-concat')
const db = require('../config/database.js')
const tmpDir = process.env.TMP_DIR

const FILES = fs.readdirSync(tmpDir)
const combinedStream = new StreamConcat(FILES.map((f) => fs.createReadStream(tmpDir + f)))

let recordCounter = 0
let processedCounter = 0
let errorCounter = 0
let batch = []
const BATCH_EVERY = 10
let flush = false

// We kept this close to original CSV, it will need updated if the CSVs update
const COLUMNS = ['ein', 'name', 'ico', 'street', 'city', 'state', 'zip', 'group_number', 'subsection', 'affiliation',
  'classification', 'ruling', 'deductibility', 'foundation', 'activity', 'organization', 'status', 'tax_period',
  'asset_cd', 'income_cd', 'filing_req_cd', 'pf_filing_req_cd', 'acct_pd', 'asset_amt', 'income_amt', 'revenue_amt',
  'ntee_cd', 'sort_name']

combinedStream
.pipe(csv.parse({relax_column_count: true, columns: COLUMNS})) // will auto-discover headers in first line
.on('end', () => {
  // Flush last chunk
  flush = true
})
// Filter and batch
.pipe(csv.transform((data) => {
  if (++recordCounter % 10000 === 0) console.log('Read ' + recordCounter + ' records'); // eslint-disable-line
  // TODO: Get rid of empty files with undefined columns
  if (data.ein === 'EIN') return null // abort this header row

  // Push to batch array. If we've hit our batch size, return the data and reset.
  batch.push(data)
  if (batch.length === BATCH_EVERY || flush) {
    const out = batch.slice()
    batch = []
    return out
  }
  return null
}))
// Process (data is an array of BATCH_EVERY length)
.pipe(csv.transform((data, cb) => {
  processRows(data).then(
  // Promise to cb for csv.transform
    (processedData) => {
      if (flush) {
        db('organizations').count('*').then((result) => {
          console.log('Finished with ' + result[0].count + ' records') // eslint-disable-line
          console.log('and ' + errorCounter + ' errors')  // eslint-disable-line
          process.exit()
        })
      } else {
        console.log('Processed ' + ++processedCounter * BATCH_EVERY + ' records'); // eslint-disable-line
      }
      cb(processedData)
    },
    (err) => {
      cb(err)
    }
  )
}))
.on('error', console.error); // eslint-disable-line

// This is processing an array of 1000
function processRows(dataArr) {
  // sanitize
  dataArr = _.map(dataArr, (o) => {
    return _.mapValues(o, (v) => {
      return v.length > 0 && v !== '' ? v : null
    })
  })
  return db('organizations')
    .insert(dataArr)
    .return()
    .catch(() => {
      errorCounter++
    })
}
