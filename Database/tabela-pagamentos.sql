-- TABELA PAGAMENTOS
create table pagamento (
    id serial primary key,
	id_brownie int,
	cpf varchar,
	data_pagamento date,
	descricao varchar,
	preco real,
	foreign key (id_brownie) references brownies (id)
);

-- Pagamento
insert into pagamento(id_brownie, cpf, data_pagamento, descricao, preco)
values(1, '111', '16/05/2025', 'Brownie Tradicional com Nutella', 8.00);

insert into pagamento(id_brownie, cpf, data_pagamento, descricao, preco)
values(2, '608', '16/05/2025', 'Brownie Gourmet com Ferrero Rocher', 10.00);

select * from pagamento;

-- Buscar o histórico de um CPF
select * from pagamento where cpf = '111';