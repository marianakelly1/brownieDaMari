-- TABELA PEDIDOS
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(20),
    data_pagamento DATE,
    preco_total REAL
);

INSERT INTO pedidos (cpf, data_pagamento, preco_total) VALUES
('608111', '19/06/2025', 19.00);