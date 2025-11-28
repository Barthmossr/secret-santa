create table requests (
  id uuid default gen_random_uuid() primary key,
  name varchar(100) not null unique,
  item_1 varchar(255) not null,
  item_2 varchar(255),
  item_3 varchar(255),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
