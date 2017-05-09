// @flow
import db from './config/database';
import {filtersData} from './filtersData';

const query = {};

query.getOrganizations = (req, res, next) => {
  const select = db.select('*')
    .from('organizations');
  createOrganizationWhereFilter(select, req.query)
  .then((data) => {
    return res.status(200)
      .json({
        status: 'success',
        organizationsData: data,
        filtersData: filtersData,
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

  if (filters.income_cd) {
    const codes = filters.income_cd.split(',');
    select.where('income_cd', 'in', codes);
  }

  if (filters.ntee_cd) {
    const codes = filters.ntee_cd.split(',');
    codes.forEach((v, k) => {
      if (k === 0) {
        select.where('ntee_cd', 'like', v + '%');
        return;
      }
      select.orWhere('ntee_cd', 'like', v + '%');
    });
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


  // Order by
  if (filters.order) {
    const orderByArr = filters.order.split(',');
    orderByArr.forEach((v) => {
      const order = v.split('-');
      // Order has the [0] property and the [1] direction
      select.orderBy(order[0], order[1]);
    });
  } else {
    select.orderBy('name', 'asc');
  }

  // Default to 20 items per
  const limit = filters.limit ? filters.limit : 20;
  select.limit(limit);

  const page = filters.page ? filters.page - 1 : 0;
  const offset = page * limit;
  select.offset(offset);

  return select;
}
