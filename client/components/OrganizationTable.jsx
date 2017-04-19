import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const OrganizationTable = ({organizations}) => {
  
  const keys = ['ein', 'name', 'ico', 'street', 'city', 'state', 'zip', 'group_number', 'subsection', 'affiliation',
  'classification', 'ruling', 'deductibility', 'foundation', 'activity', 'organization', 'status', 'tax_period', 
  'asset_cd', 'income_cd', 'filing_req_cd', 'pf_filing_req_cd', 'acct_pd', 'asset_amt', 'income_amt', 'revenue_amt',
  'ntee_cd', 'sort_name'];
  
  const columns = keys.map((k) => {return {header: k, accessor: k}});
  return (
    <ReactTable
      data={organizations}
      columns={columns}
    />
  );
}

export default OrganizationTable;
