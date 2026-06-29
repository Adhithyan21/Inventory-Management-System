const exp = require('express');

const app = exp();

app.listen(3000 , () => {
    console.log("Express Server is working on port 3000");
});

app.get('/', (req,res) => {
    console.log("route entered");
    res.send("Welcome to inventory management system");
});


app.get('/Inventorysystem', (req, res) => {
    res.redirect('/');
});

app.get('/products', (req, res) => {
    console.log("products route entered");
    res.json(products);
});


app.use((req, res) => {
    res.status(404).send("Page not Found");
})

const products = [
    {
        productId: 1,
        "name": "Rice",
        "category": "Food",
        price: 50,
        quantity: 50
    },
    {
        productId: 2,
        "name": "Dal",
        "category": "Food",
        price: 30,
        quantity: 50
    },
    {
        productId: 3,
        "name": "Wheat",
        "category": "Food",
        price: 25,
        quantity: 50
    }
];
