import db from './config/database'

const query = {};

query.getOrganizations = (req, res, next) => {
  db.any('SELECT * FROM organizations LIMIT 20')
  .then((data) => {
    return res.status(200)
      .json({
        status: 'success',
        data: data
      })
  })
  .catch((err) => {
    return next(err)
  })
}

export default query;