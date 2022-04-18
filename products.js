const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection open')
    })
    .catch(err => {
        console.log('sorry thats an error')
        console.log(err)
    })


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
});

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}
productSchema.methods.changePrice = function () {
    this.price = 19550;
    return this.save();
}
productSchema.methods.changeStock = function (stock) {
    this.qty.online = stock;
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}


const Product = mongoose.model('Product', productSchema)

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mac' })
    console.log('not changed');
    console.log(foundProduct);
    await foundProduct.changeStock(10);
    console.log('changed');
    console.log(foundProduct);

}

Product.fireSale().then(res => console.log(res))
// const iPhone = new Product({ name: 'Mac', price: 5500, categories: ['Luxury', 'Useful'], qty: { inStore: 99 } })

// iPhone.save()
//     .then(data => {
//         console.log('itworked')
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(err)
//         console.log('error!!!!')
//     })

// Product.findOneAndUpdate({ name: 'Mac' }, { price: 20000 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("it worked, updated");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("sorry thats an error");
//         console.log(err)
//     })