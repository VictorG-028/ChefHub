begin;
select plan(3); -- only one statement to run

SELECT has_column(
    'User',
    'id',
    'id should exist'
);

SELECT has_column(
    'User',
    'email',
    'email should exist'
);

SELECT has_column(
    'User',
    'password',
    'password should exist'
);

select * from finish();
rollback;
