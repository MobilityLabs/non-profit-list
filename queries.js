// @flow
import db from './config/database';

const query = {};

query.getOrganizations = (req, res, next) => {
  const select = db.select('*')
    .from('organizations');
  console.log(createOrganizationWhereFilter(select, req.query).toString());
  createOrganizationWhereFilter(select, req.query)
  .then((data) => {
    return res.status(200)
      .json({
        status: 'success',
        data: data
      });
  })
  .catch((err) => {
    return next(err);
  });
};

export default query;

function createOrganizationWhereFilter(select, filters) {
  if (filters.name) {
    select.where('name', 'ilike', '%'+ filters.name +'%');
  }

  if (filters.ntee_cd) {
    const codes = filters.ntee_cd.split(',');
    select.where('ntee_cd', 'in', codes);
  }

  if (filters.income_cd) {
    const codes = filters.income_cd.split(',');
    select.where('income_cd', 'in', codes);
  }

  // Filter by states
  if (filters.state) {
    const states = filters.state.split(',');
    select.where('state', 'in', states);
  }

  if (filters.city) {
    const states = filters.city.split(',');
    select.where('city', 'in', states);
  }

  // Default to 20 items per
  const limit = filters.limit ? filters.limit : 20;
  select.limit(limit);

  const page = filters.page ? filters.page - 1 : 0;
  const offset = page * limit;
  select.offset(offset);

  return select;
}
