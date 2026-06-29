const exp = require('express');

const app = exp();

app.listen(3000 , () => {
    console.log("Express Server is working on port 3000");
});

app.get('/', (req,res) => {
    res.send("Server is running");
});


app.get('/Inventory', (req, res) => {
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.send("Welcome to express server");
});


app.use((req, res) => {
    res.status(404).send("Page not Found");
})

