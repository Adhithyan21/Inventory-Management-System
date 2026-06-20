const http = require('http');
const server = http.createServer((req,res) => {
    console.log(req.url);
    console.log(req.method);
    if (req.url === "/" && req.method === "GET") {
        res.write("Welcome to the server");
        res.end();
    }
    else if (req.url === "/products" && req.method === "GET") {
        res.write(JSON.stringify(products));
        res.end();
    }
    else if(req.url.startsWith("/products/") && req.method === "GET") { 
        const ID = req.url.split("/")[2];
        const productID = Number(ID);
        const product = products.find(p => p.productId === productID);
        if (product) {
            res.write(JSON.stringify(product));
            res.end();
        }
        else {
            res.statusCode = 404;
            res.write("Product not found");
            res.end();
        }
    }
    else if(req.url === "/products" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            console.log("BODY:", body);
            const newProduct = JSON.parse(body);
            console.log(newProduct);
            if (newProduct.name && newProduct.category && newProduct.price && newProduct.quantity >= 0) {
                let maxId = 0;
                products.forEach(p => {
                    if (p.productId > maxId) {
                        maxId = p.productId;
                    }
                });
                newProduct.productId = maxId + 1;
                products.push(newProduct);
                res.write("Product added successfully");
                res.end();
            }
            else {
                res.statusCode = 400;
                res.write("Fill all the details");
                res.end();
            }
        });
    }
    else if (req.url.startsWith('/products') && req.method === "PUT") {
        console.log("Route entered");
        let ID = req.url.split('/')[2];
        let productID = Number(ID);
        const product = products.find(p => p.productId === productID);
        if (!product){
            res.write("Products not found");
            res.statusCode = 404;
            res.end();
            return;
        }
        else {
            console.log(product);
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                console.log("Body:", body);
                if (!body) {
                    res.statusCode = 400;
                    res.write("No data provided");
                    res.end();
                    return;
                }
                const upd = JSON.parse(body);
                console.log(upd);
                const fields = Object.keys(upd);
                let length = fields.length;
                console.log(length);
                if (fields.length === 0) {
                    res.statusCode = 400;
                    res.write("No fields to update");
                    res.end();
                    return;
                }       
                const allowed = ["name", "category", "price", "quantity"];
                let validfields = true;
                fields.forEach(f => {
                    if (!allowed.includes(f)){
                        validfields = false;
                    }
                });
                if (validfields) {
                    fields.forEach(f => {
                        product[f] = upd[f];
                    });
                    res.write("Product updated successfully");
                    res.end();
                }
                else {
                    res.statusCode = 400;
                    res.write("Invalid Fields found");
                    res.end();
                }
        });
        }
    }
    else if (req.url.startsWith('/products') && req.method === 'DELETE') {
        console.log("Route Entered");
        const ID = req.url.split('/')[2];
        const productID = Number(ID);
        const Index = products.findIndex(p => p.productId === productID);
        if (Index === -1) {
            res.statusCode = 404;
            res.write("Product not found");
            res.end();
            return;
        }
        else {
            console.log("Index found", Index);
            products.splice(Index, 1);
            res.write("Product deleted successfully");
            res.end();
        }
    }
});

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

server.listen(3000, () => {
    console.log("Server is successfully running on port 3000");
});
