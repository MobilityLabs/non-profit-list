/* 
  Command to run this in shell
  $ psql -Upostgres -f sql/01_create_database.sql */

DROP DATABASE IF EXISTS "nonprofits";
CREATE DATABASE "nonprofits";

\c nonprofits;

CREATE TABLE organizations (
  ein integer PRIMARY KEY,
  name text,
  ico text,
  street text,
  city text,
  state text,
  zip text,
  country text,
  group_number integer,
  subsection integer,
  affiliation integer,
  classification integer,
  ruling integer,
  deductibility integer,
  foundation integer,
  activity integer,
  organization integer,
  status integer,
  tax_period integer,
  asset_cd integer,
  income_cd integer,
  filing_req_cd integer,
  pf_filing_req_cd integer,
  acct_pd integer,
  asset_amt bigint,
  income_amt bigint,
  revenue_amt bigint,
  ntee_cd text,
  sort_name text
);

CREATE OR REPLACE FUNCTION update_updated_at_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organization_updated_at_time BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE PROCEDURE  update_updated_at_column();

