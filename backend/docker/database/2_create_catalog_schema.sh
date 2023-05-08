#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "ecommerce_demo" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS catalog;

  CREATE TABLE IF NOT EXISTS catalog.products (
      id          SERIAL PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT,
      image       TEXT,
      price       NUMERIC,
      created_at  timestamptz NOT NULL DEFAULT NOW(),
      updated_at  timestamptz NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS catalog.categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at  timestamptz NOT NULL DEFAULT NOW(),
    updated_at  timestamptz NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS catalog.product_categories (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES catalog.products(id),
    category_id INTEGER REFERENCES catalog.categories(id),
    created_at  timestamptz NOT NULL DEFAULT NOW(),
    updated_at  timestamptz NOT NULL DEFAULT NOW()
  );

  CREATE TRIGGER created_at_products_trgr BEFORE UPDATE ON catalog.products FOR EACH ROW EXECUTE PROCEDURE created_at_trigger();
  CREATE TRIGGER updated_at_products_trgr BEFORE UPDATE ON catalog.products FOR EACH ROW EXECUTE PROCEDURE updated_at_trigger();

  CREATE TRIGGER created_at_categories_trgr BEFORE UPDATE ON catalog.categories FOR EACH ROW EXECUTE PROCEDURE created_at_trigger();
  CREATE TRIGGER updated_at_categories_trgr BEFORE UPDATE ON catalog.categories FOR EACH ROW EXECUTE PROCEDURE updated_at_trigger();

  CREATE TRIGGER created_at_product_categories_trgr BEFORE UPDATE ON catalog.product_categories FOR EACH ROW EXECUTE PROCEDURE created_at_trigger();
  CREATE TRIGGER updated_at_product_categories_trgr BEFORE UPDATE ON catalog.product_categories FOR EACH ROW EXECUTE PROCEDURE updated_at_trigger();

  GRANT USAGE ON SCHEMA catalog TO ecommerce_demo_user;
  GRANT INSERT, UPDATE, DELETE, SELECT ON ALL TABLES IN SCHEMA catalog TO ecommerce_demo_user;
EOSQL
