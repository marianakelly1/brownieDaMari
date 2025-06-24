-- TABELA BROWNIES
create table brownies (
   id int primary key,
   nome varchar,
   preco real
);

-- Inserindo brownies
insert into brownies values(1, 'Brownie Tradicional', 4.00);
insert into brownies values(2, 'Brownie Gourmet', 5.50);

select * from brownies;