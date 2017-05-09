// @flow
import db from './config/database';
import {filtersData} from './filtersData';

const query = {};

query.getOrganizations = async (req, res, next) => {
  try {
    let mainQuery = db.select('*')
      .from('organizations');
    mainQuery = createOrganizationWhere(mainQuery, req.query);
    mainQuery = createOrganizationOrderBy(mainQuery, req.query);
    mainQuery = createOrganizationLimit(mainQuery, req.query);

    let aggQuery = db.count('*').from('organizations');
    aggQuery = createOrganizationWhere(aggQuery, req.query);

    const data = await mainQuery;
    const summaryData = await aggQuery;

    return res.status(200).json({
      status: 'success',
      organizationsData: data,
      filtersData: filtersData,
      summaryData: summaryData[0], // An object with count
    });
  } catch (err) {
    return next(err);
  }
};

export default query;

function createOrganizationWhere(select, filters) {
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

  return select;
}

function createOrganizationOrderBy(select, filters) {
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

  return select;
}

function createOrganizationLimit(select, filters) {
  // Default to 20 items per
  const limit = filters.limit ? filters.limit : 20;
  select.limit(limit);

  const page = filters.page ? filters.page - 1 : 0;
  const offset = page * limit;
  select.offset(offset);

  return select;
}
