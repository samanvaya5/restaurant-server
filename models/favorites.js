const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var favoriteDishSchema  = new Schema({
    dish:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Dish'
        }
})
var favoriteSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        unique : true
    },
    dishes : [favoriteDishSchema]
});

var Favorites = mongoose.model('Favorite',favoriteSchema);
module.exports= Favorites;