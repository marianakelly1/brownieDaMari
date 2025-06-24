class BrownieRepository {
    constructor(database) {
        this.database = database;
    }

    async getAllBrownies() {
        try {
            const sql = "select * from brownies";
            const response = await this.database.query(sql);
            return response.rows;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getBrownieByID(id) {
        try {
            const sql = "select nome, preco from brownies where id = $1";
            const response = await this.database.query(sql, [id]);
            return response.rows;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getFillingsByID(id) {
        try {
            const sql = "select nome, preco from recheios where id_brownie = $1";
            const response = await this.database.query(sql, [id]);
            return response.rows;
        } catch (error) {
            return { error: error.message };
        }
    }

    async setPayment(payInfo) {
        try {
            const sql = `
                insert into pagamento(id_brownie, cpf, data_pagamento, descricao, preco)
                values($1, $2, $3, $4, $5)
            `;
            await this.database.query(sql, [
                payInfo.id_brownie,
                payInfo.cpf,
                payInfo.data_pagamento,
                payInfo.descricao,
                payInfo.preco
            ]);
            return "Pagamento realizado com sucesso!";
        } catch (error) {
            return { error: error.message };
        }
    }

    async getAllHistory() {
    try {
        const sqlOrders = 'SELECT * FROM pedidos';
        const ordersResult = await this.database.query(sqlOrders);
        const orders = ordersResult.rows;

        for (let order of orders) {
            const sqlItems = 'SELECT * FROM itens_pedido WHERE id_pedido = $1';
            const itemsResult = await this.database.query(sqlItems, [order.id]);
            order.items = itemsResult.rows;
        }

        return orders;
    } catch (error) {
        return { error: error.message };
    }
}

async setOrder(orderInfo) {
    const client = await this.database.connect();
    try {
        await client.query('BEGIN');

        const resOrder = await client.query(
            'insert into pedidos(cpf, data_pagamento, preco_total) values($1, $2, $3) returning id',
            [orderInfo.cpf, orderInfo.data_pagamento, orderInfo.preco_total]
        );
        const orderId = resOrder.rows[0].id;

        for (let item of orderInfo.items) {
            await client.query(
                'insert into itens_pedido(id_pedido, id_brownie, descricao, preco) values($1, $2, $3, $4)',
                [orderId, item.id_brownie, item.descricao, item.preco]
            );
        }

        await client.query('COMMIT');
        return { message: 'Pedido realizado com sucesso!' };
    } catch (error) {
        await client.query('ROLLBACK');
        return { error: error.message };
    } finally {
        client.release();
    }
}


}

module.exports = BrownieRepository;
