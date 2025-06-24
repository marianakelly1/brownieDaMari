-- TABELA ITENS DO PEDIDO
CREATE TABLE itens_pedido (
    id SERIAL PRIMARY KEY,
    id_pedido int,
    id_brownie int,
    descricao VARCHAR(200),
    preco REAL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    FOREIGN KEY (id_brownie) REFERENCES brownies(id)
);


INSERT INTO itens_pedido (id_pedido, id_brownie, descricao, preco) VALUES
(1, 2, 'Brownie Gourmet com Oreo, Ferrero Rocher, Ninho e Nutella', 19.00);