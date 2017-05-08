// @flow

// Helpers
export type GenericMap<T, U> = {[key: T]: U};

export type Organization = {
  ein: string,
  name: string,
  ico: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  group_number: number,
  subsection: number,
  affiliation: string,
  classification: string,
  ruling: string,
  deductibility: string,
  foundation: string,
  activity: string,
  organization: string,
  status: string,
  tax_period: number,
  asset_cd: string,
  income_cd: string,
  filing_req_cd: string,
  pf_filing_req_cd: string,
  acct_pd: string,
  asset_amt: number,
  income_amt: number,
  revenue_amt: number,
  ntee_cd: string,
  sort_name: string,
};

export type Organizations = Organization[];

export type SummaryData = {

};

export type FilterData = {

};

export type Filters = {};
