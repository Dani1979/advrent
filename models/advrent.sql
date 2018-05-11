DROP TABLE IF EXISTS advr_product;
CREATE TABLE advr_product (
  id_product SERIAL PRIMARY KEY,
  id_supplier integer,
  id_manufacturer integer ,
  id_category integer NOT NULL,
  unit_price decimal(20,6)  DEFAULT '0.000000',
  price decimal(20,6) DEFAULT '0.000000',
  rent_price decimal(20,6)  DEFAULT '0.000000',
  reference varchar(32) NOT NULL,
  manufacturer_reference varchar(32) DEFAULT NULL,
  product_description varchar(1000) default null,
  id_warehouse integer not null default 1,
  width decimal(20,6)  DEFAULT '0.000000',
  height decimal(20,6)  DEFAULT '0.000000',
  depth decimal(20,6)  DEFAULT '0.000000',
  weight decimal(20,6) DEFAULT '0.000000',
  id_color integer,
  date_add timestamp NOT NULL,
  date_upd timestamp NOT NULL,
  state integer  DEFAULT '1'
) ;


DROP TABLE IF EXISTS advr_history_wharehouse_movements;
CREATE TABLE advr_history_wharehouse_movements (
  id_product integer,
  id_warehouse integer,
  date_from timestamp,
  date_to timestamp
) ;


DROP TABLE IF EXISTS advr_warehouse;
CREATE TABLE advr_warehouse (
  id_warehouse SERIAL PRIMARY KEY,
  warehouse_name varchar(100),
  direction varchar(300),
  responsible varchar(150),
  cif varchar(50),
  tlf integer
) ;

DROP TABLE IF EXISTS advr_category;
CREATE TABLE advr_category (
  id_category SERIAL PRIMARY KEY,
  id_category_parent integer,
  category_name varchar(100),
  date_add timestamp
) ;


DROP TABLE IF EXISTS advr_supplier;
CREATE TABLE advr_supplier (
  id_supplier SERIAL PRIMARY KEY,
  supplier_name varchar(100),
  direction varchar(300),
  responsible varchar(150),
  cif varchar(50),
  tlf varchar(50)
) ;


DROP TABLE IF EXISTS advr_manufacturer;
CREATE TABLE advr_manufacturer (
  id_manufacturer SERIAL PRIMARY KEY,
  manufacturer_name varchar(100),
  direction varchar(300),
  responsible varchar(150),
  cif varchar(50),
  tlf integer
) ;

DROP TABLE IF EXISTS advr_attribute;
CREATE TABLE advr_attribute (
  id_attribute serial,
  attribute_name varchar(50),
  value varchar(150),
  dateadd timestamp
) ;

