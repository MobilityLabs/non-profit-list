
/*
  Command to run this in shell
  $ psql -Upostgres -f sql/03_add_id_and_change_primary_key.sql
*/

\c nonprofits;

ALTER TABLE organizations DROP CONSTRAINT organizations_pkey;
ALTER TABLE organizations ADD COLUMN id SERIAL PRIMARY KEY;
