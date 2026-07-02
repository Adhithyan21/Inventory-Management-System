const exp = require('express');

const app = exp();

//Middleware to parse the request data
app.use(exp.json());

app.listen(3000 , () => {
    console.log("Express Server is working on port 3000");
});

//Routes
//get route - Welcome Page
app.get('/', (req,res) => {
    console.log("route entered");
    res.send("Welcome to inventory management system");
});

//Get route - Redirecting
app.get('/Inventorysystem', (req, res) => {
    res.redirect('/');
});

//get route - Get all products
app.get('/products', (req, res) => {
    res.send(products);
});

//Get route - to get Specifi products using route params.
app.get('/products/:id', (req,res) => {
    productID = Number(req.params.id);
    const product = products.find(p => p.productId === productID);
    if(product) {
        res.send(product);
        console.log("Product found");
    }
    else {
        res.status(400).send("Product not found");
        console.log("Product not Found");
    }
});

//Post Route - Add new product.
app.post('/products', (req, res) => {
    const new_product = req.body;
    if (new_product.name && new_product.category && new_product.price && new_product.quantity){
        let maxid = 0;
        products.forEach(p => { 
            if (p.productId > maxid){
                maxid = p.productId;
            }
        });
        new_product.productId = maxid + 1;
        console.log(new_product.productId);
        console.log(new_product);
        products.push(new_product);
        res.send("Product Added successfully");
    }
    else {
        res.status(400).send("Invalid product fields")
    }
});

//Put route - Update products
app.put('/products/:id', (req,res) => {
    const updid = Number(req.params.id);
    const upd_product = req.body;
    console.log(req.body);
    const product = products.find(p => p.productId == updid);
    if (!product){
        res.status(404).send("Product not Found");
    }
    else {
        let allowed = ["name", "price", "category", "quantity"];
        let fields = Object.keys(upd_product);
        let length = fields.length;
        let validfields = true;
        if (length == 0){
            res.status(400).send("Fields are empty");
        }
        else {
            fields.forEach(f => {
                if(!allowed.includes(f)){
                    validfields = false;
                }
            });
            if (validfields) {
                fields.forEach(f => {
                    product[f] = upd_product[f];
                });
            }
        }
    console.log("route entered");
    res.send("Product updated successfully");
    }
});

//Delete route
app.delete('/product/:id', (req,res) => {
    res.send("route Entered")
    let delid = Number(req.params.id);
    let product = products.find(p => p.productId == delid);
    if(!product) {
        res.status(404).send("No product found");
    }
    else {
        products.splice(product, 0);
        res.send("product deleted successfully");
    }
    res.send("route ended");

});

//End Middleware
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
