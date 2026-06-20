const http = require("http");
const { json } = require("stream/consumers");
const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    if (req.url === "/" && req.method === "GET") {
        res.write("Welcome to the server");
        res.end();
    }
    else if(req.url === "/about" && req.method === "GET"){
        res.write("This is my first project an inventory management system");
        res.end();
    }
    else if(req.url === "/products" && req.method === "GET"){
        res.write(JSON.stringify(products));
        res.end();
    }
    else if(req.url.startsWith("/products/") && req.method === "GET"){
        const ID = req.url.split("/")[2];
        console.log("Req.url", req.url);
        const productID = Number(ID);
        const product = products.find(p => p.productId === productID);
        if (product) {
            res.write(JSON.stringify(product));
            res.end();
        }
        else {
            res.statusCode = 404;
            res.write("product not found");
            res.end();
        }
    }
    else if(req.url === "/products" && req.method === "POST") {
        console.log("Route entered");
        let body = "";
        req.on("data" , chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            console.log("Body:" ,body);
            const newProduct = JSON.parse(body);
            if (newProduct.name && newProduct.category && newProduct.price && newProduct.quantity){
                let maxID = 0;
                products.forEach(p => {
                    if (p.productId > maxID){
                        maxID = p.productId;
                    }
                });
            newProduct.productId = maxID + 1;
            products.push(newProduct);
            res.write("Product added successsfully");
            res.end();
            }
            else {
                res.statusCode = 400;
                res.write("please fill all fields");
                res.end()
            }
        });
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
server.listen(5000, () => {
    console.log("Server is working in port 5000");
});