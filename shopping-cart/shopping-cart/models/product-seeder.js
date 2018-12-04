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
    imagePath : 'https://www.nda-toys.com/images/wholesale/transformers-generations-prime-voyager-asst-wholesale-17001.jpg',
    title : 'Transformers Toys Wholesale - NDA Toys',
    price : 30
}),
new Product({
    imagePath : 'https://i.ebayimg.com/images/g/IcUAAOSwu1VW3uwH/s-l300.jpg',
    title : 'Transformers Toys Human Alliance Bumblebee',
    price : 20
}),
new Product({
    imagePath : 'https://ae01.alicdn.com/kf/HTB1tbKROVXXXXcoaFXXq6xXFXXXO/1Pc-Baby-Toys-Music-Cartoon-Phone-Educational-Developmental-Kids-Toy-Gift-New.jpg',
    title : 'Baby Muscial Toy',
    price : 50
}),
new Product({
    imagePath : 'https://images-na.ssl-images-amazon.com/images/I/81d0x32IAOL._SX425_.jpg',
    title : 'Yellow Kids Toy Doodle Car',
    price : 50
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
new Product({
    imagePath : 'https://rukminim1.flixcart.com/image/612/612/jmi22kw0/puzzle/d/h/f/1-high-speed-stickerless-3x3-magic-rubik-cube-puzzle-game-toy-original-imaf8g4zyghejjkc.jpeg?q=70',
    title : ' Chief High Speed Stickerless 3x3 Magic Rubik',
    price : 15
}),
new Product({
    imagePath : 'https://ae01.alicdn.com/kf/HTB1Lfw7KVXXXXX1apXXq6xXFXXX4/Mini-Caterpillar-Soft-Toy-Doll-Rattle-Kids-Baby-Playmate-Toys-Calm-Owl-Doll-Cute-peek-a.jpg',
    title : 'Mini Caterpillar Soft Toy Doll Rattle Kids ',
    price : 25
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
