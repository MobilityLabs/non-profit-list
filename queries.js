// @flow
import db from './config/database'
import {filtersData, defaultFilters} from './client/src/filtersData'
import {mapValues} from 'lodash'

// Shared by index and api routes
export const getOrganizationsData = async (filters, next) => {
  try {
    let mainQuery = db.select('*')
      .from('organizations')
    mainQuery = createOrganizationWhere(mainQuery, filters)
    mainQuery = createOrganizationOrderBy(mainQuery, filters)
    mainQuery = createOrganizationLimit(mainQuery, filters)

    const data = await mainQuery
    return {
      filters: defaultFilters,
      filtersData: filtersData,
      organizationsData: data,
      status: 'success',
    }
  } catch (err) {
    return next(err)
  }
}

// Used by the API
export const getOrganizations = async (req, res, next) => {
  const data = await getOrganizationsData(req.query, next)
  data.timestamp = req.query.timestamp || Date.now()
  return res.status(200).json(data)
}

export const getSummaryData = async (filters, next) => {
  try {
    let aggQuery = db('organizations')
      .count('* as count')
      .avg('income_amt as income_avg')
      .min('income_amt as income_min')
      .max('income_amt as income_max')
      .select(db.raw('median(income_amt) as income_med'))
      .avg('revenue_amt as revenue_avg')
      .min('revenue_amt as revenue_min')
      .max('revenue_amt as revenue_max')
      .select(db.raw('median(revenue_amt) as revenue_med'))
      .avg('asset_amt as asset_avg')
      .min('asset_amt as asset_min')
      .max('asset_amt as asset_max')
      .select(db.raw('median(asset_amt) as asset_med'))
    aggQuery = createOrganizationWhere(aggQuery, filters)

    const summaryData = await aggQuery
    const numberSummaryData = mapValues(summaryData[0], (v) => {
      if (v === null) {return v}
      return Math.round(v * 100) / 100
    })

    return {
      summaryData: numberSummaryData, // An object with count
    }
  } catch (err) {
    return next(err)
  }
}

// Used by the API
export const getSummary = async (req, res, next) => {
  const data = await getSummaryData(req.query, next)
  data.timestamp = req.query.timestamp || Date.now()
  return res.status(200).json(data)
}

function createOrganizationWhere(select, filters) {
  if (filters.name) {
    select.where('name', 'ilike', '%'+ filters.name +'%')
  }

  if (filters.income_cd) {
    const codes = filters.income_cd.split(',')
    select.where('income_cd', 'in', codes)
  }

  if (filters.ntee_cd) {
    const codes = filters.ntee_cd.split(',')
    codes.forEach((v, k) => {
      if (k === 0) {
        select.where('ntee_cd', 'like', v + '%')
        return
      }
      select.orWhere('ntee_cd', 'like', v + '%')
    })
  }

  if (filters.income_cd) {
    const codes = filters.income_cd.split(',')
    select.where('income_cd', 'in', codes)
  }

  // Filter by states
  if (filters.state) {
    const states = filters.state.split(',')
    select.where('state', 'in', states)
  }

  if (filters.city) {
    const states = filters.city.split(',')
    select.where('city', 'in', states)
  }

  return select
}

function createOrganizationOrderBy(select, filters) {
  // Order by
  if (filters.order) {
    const orderByArr = filters.order.split(',')
    orderByArr.forEach((v) => {
      const order = v.split('-')
      // Order has the [0] property and the [1] direction
      select.orderBy(order[0], order[1])
    })
  } else {
    select.orderBy('name', 'asc')
  }

  return select
}

function createOrganizationLimit(select, filters) {
  // Default to 20 items per
  const limit = filters.limit ? filters.limit : 20
  select.limit(limit)

  const page = filters.page ? filters.page - 1 : 0
  const offset = page * limit
  select.offset(offset)

  return select
}
