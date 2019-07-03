
/*
  Command to run this in shell
  $ psql -Upostgres -f sql/04_index_ein_tax_period.sql
*/

\c nonprofits;

ALTER TABLE organizations ADD CONSTRAINT unique_ein_tax_period UNIQUE (ein, tax_period);
