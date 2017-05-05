import db from './config/database';
import pgp from 'pg-promise';

const createOrganizationFilter = (filters) => {
  let cnd = [];
  console.log(filters);
  if (filters.name) {
    cnd.push(pgp.as.format("name ILIKE '%$1^%'", filters.name.toLowerCase()));
  }

  if (filters.ntee_cd) {
    const codes = filters.ntee_cd.split(',');
    const psqlCodes = pgp.as.array(codes);
    cnd.push(pgp.as.format("ntee_cd = ANY($1^)", psqlCodes));
  }

  // Filter by states
  if (filters.state) {
    const states = filters.state.split(',');
    const psqlStates = pgp.as.array(states);
    cnd.push(pgp.as.format("state = ANY($1^)", psqlStates));
  }
  if (cnd.length > 0) {
    return ' WHERE' + cnd.join(" AND ");
  }
};

const query = {};

query.getOrganizations = (req, res, next) => {
  console.log(req.query);
  const filters = createOrganizationFilter(req.query) || '';
  db.any('SELECT * FROM organizations' + filters + ' LIMIT 20')
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