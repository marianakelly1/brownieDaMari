-- TABELA RECHEIOS
create table recheios (
    id int,
	id_brownie int,
	nome varchar,
	preco real,
	primary key(id, id_brownie),
	foreign key (id_brownie) references brownies(id)
);

-- RECHEIOS BROWNIE
insert into recheios values(1, 1, 'Nutella', 3.00);
insert into recheios values(2, 1, 'Brigadeiro', 2.50);
insert into recheios values(3, 1, 'Doce de Leite', 2.50);
insert into recheios values(4, 1, 'Beijinho(coco)', 2.50);
insert into recheios values(5, 1, 'Ninho', 3.00)

-- RECHEIOS BROWNIE GOURMET
insert into recheios values(1, 2, 'Morango', 3.50);
insert into recheios values(2, 2, 'Oreo', 3.00);
insert into recheios values(3, 2, 'Kit Kat', 4.00);
insert into recheios values(4, 2, 'Ferrero Rocher', 4.50);
insert into recheios values(5, 2, 'Ouro Branco', 1.50);
insert into recheios values(6, 2, 'Ninho', 3.00);
insert into recheios values(7, 2, 'Nutella', 3.00);
insert into recheios values(8, 2, 'Maracujá', 2.50);
insert into recheios values(9, 2, 'Batom Garoto', 1.50);



select * from recheios;