-- Crear la tabla CountryCode
CREATE TABLE country_code (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(255) NOT NULL UNIQUE,
  country_name VARCHAR(255) NOT NULL
);

-- Crear la tabla LastName
CREATE TABLE last_name (
  id UUID PRIMARY KEY,
  last_name VARCHAR(255) NOT NULL UNIQUE,
  force_to_search BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Crear la tabla CountLastName
CREATE TABLE count_last_name (
  id UUID PRIMARY KEY,
  country_code_id INTEGER,
  last_name_id UUID,
  count NUMERIC NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (country_code_id) REFERENCES country_code (id),
  FOREIGN KEY (last_name_id) REFERENCES last_name (id),
  UNIQUE (country_code_id, last_name_id)
);
