-- File for querying the procedures table for a string.


-- Replace 'open' with any string you want to search for... see below
select * from procedures
where name ilike '%EXAMPLE SEARCH QUERY%';

-- select * from procedures
-- where name ilike '%$1%';