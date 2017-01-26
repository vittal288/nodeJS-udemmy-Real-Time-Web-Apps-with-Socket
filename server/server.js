const path = require('path');
const express = require('express')
//------------------------------------------
var app = express();
var PORT = process.env.PORT || 3000;
var publicPath = path.join(__dirname+'./../public');
console.log(publicPath);


app.use(express.static(publicPath));



app.listen(PORT,()=>{
    console.log(`Server is UP and running with ${PORT}`);
});



