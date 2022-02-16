// const express = require('express')
// const app = express()
// const path = require('path')
// const port = process.env.PORT || 3001

// app.use('/', express.static(path.join(__dirname, 'public')))

// app.listen(port, () => console.log("Listening on Port", port)) 

const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'build','index.html'));
});


app.listen(port, () => {
    console.log('Server is up!');
 });
 