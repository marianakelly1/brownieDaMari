const database = require("./database");
const BrownieRepository = require("./repository");

const repository = new BrownieRepository(database);

//Função pegar todos os brownies
async function getAllBrownies(req, res) {
    const responseDB = await repository.getAllBrownies();
    if (responseDB.error) return res.status(404).json(responseDB.error);
    res.json(responseDB);
}

//Função pegar brownies pelo id
async function getBrownieByID(req, res) {
    const id = req.params.id;
    const brownie = await repository.getBrownieByID(id);
    const fillings = await repository.getFillingsByID(id);
    if (brownie.error) return res.status(404).json(brownie.error);

    const response = {
        brownie: brownie,
        recheios: fillings
    };

    res.json(response);
}

//Função para pagamento
async function setPayment(req, res) {
    const payInfo = req.body;
    const result = await repository.setPayment(payInfo);
    if (result.error) return res.status(404).json(result.error);
    res.json(result);
}

async function getAllHistory(req, res) {
    const result = await repository.getAllHistory();
    if (result.error) return res.status(404).json(result.error);
    res.json(result);
}

//Função para realizar o pedido
async function setOrder(req, res) {
    const orderInfo = req.body;
    const result = await repository.setOrder(orderInfo);
    if (result.error) return res.status(404).json(result.error);
    res.json(result);
}



module.exports = { getAllBrownies, getBrownieByID, setPayment, getAllHistory, setOrder };
