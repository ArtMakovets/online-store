CREATE DATABASE ecommerce_demo_db;

CREATE USER ecommerce_demo_user WITH ENCRYPTED PASSWORD 'secret_pass';

GRANT ALL PRIVILEGES ON DATABASE ecommerce_demo_db TO ecommerce_demo_user;
-- GRANT CONNECT ON DATABASE ecommerce_demo_db TO ecommerce_demo_user;

\c ecommerce_demo_db

CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE public.product_categories (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);