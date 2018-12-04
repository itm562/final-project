var Product = require('../models/product');
var mongoose = require('mongoose');
//mongoose.connect('localhost:27017/shopping');
mongoose.connect("mongodb://localhost:27017/shopping", { useNewUrlParser: true });
var products =[ new Product({
    imagePath : 'https://target.scene7.com/is/image/Target/GUEST_a795bf14-4f37-4c9f-aea4-8ae95452432a?wid=488&hei=488&fmt=pjpeg',
    title : 'Transformer: Bumblebee',
    price : 20
}),
new Product({
    imagePath : 'https://i5.walmartimages.com/asr/6946293b-c468-4bcd-b856-b90010a1a8e4_1.3b31f50c695cec68b0a8205d61817fce.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
    title : 'Transformers Toys Optimus Prime Cyberverse Ultim',
    price : 40
}),
new Product({
    imagePath : 'https://www.nda-toys.com/images/wholesale/transformers-generations-prime-voyager-asst-wholesale-17001.jpg',
    title : 'Transformers Toys Wholesale - NDA Toys',
    price : 30
}),
new Product({
    imagePath : 'https://i.ebayimg.com/images/g/IcUAAOSwu1VW3uwH/s-l300.jpg',
    title : 'Transformers Toys Human Alliance Bumblebee',
    price : 20
}),
];

var done = 0;
for(var i = 0; i < products.length; i++){
    products[i].save(function(err,result){
        done++;
        if(done == products.length){
            exit();
        }
    });
}
function exit(){
mongoose.disconnect();
}
