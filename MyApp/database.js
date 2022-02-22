const { integerPropType } = require('@mui/utils');
const mongoose = require('mongoose');
const DATABASE_URL = "mongodb://localhost:27017/myapp";
let UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});
const createAccount = (data,cb)=>{
    //craete connections
    const conn = mongoose.createConnection(DATABASE_URL);
    const Users = conn.model('User', UserSchema);
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', function () {
        const newUser = new Users(data);
        //Find if there is any exist username
        Users.find({ email: data['email'] }, function (err, result) {
            if (err) return console.error(err);
            if (result.length > 0) {
                console.log('User already exist');
                conn.close();
                cb({status:400, message: "User already exist"});
            } else {
                newUser.save((err, result)=> {
                    if (err) return console.error(err);
                    console.log('User signup successfully');
                    conn.close();
                    cb({status:201, data:result});
                });
            }
        });
    });
}
const login = (data,cb)=>{
    //craete connections
    const conn = mongoose.createConnection(DATABASE_URL);
    const Users = conn.model('User', UserSchema);
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', function () {
        //Find if there is any exist username
        Users.find(data, function (err, result) {
            if (err) return console.error(err);
            if (result.length > 0) {
                console.log('User Login sucessfully');
                conn.close();
                cb({status:200, data:result});
            } else {
                console.log('User Does not exists');
                conn.close();
                cb({status:400, message: "User Does not exist"});
            }
        });
    });
}

let RecipeSchema = new mongoose.Schema({
    id: String,
    image: String,
    calories:Number,
    cuisineType:Array,
    ingredients:Array,
    totalTime:Number,
    label:String,
    uid:String,
});

const addRecipeToFavorite = (data,cb)=>{
    //craete connections
    const conn = mongoose.createConnection(DATABASE_URL);
    const Recipe = conn.model('Recipe', RecipeSchema);
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', function () {
        const newRecipe = new Recipe(data);
        //Find if there is any exist username
        Recipe.find({ id: data['id'],uid:data['uid']}, function (err, result) {
            if (err) return console.error(err);
            if (result.length > 0) {
                console.log('User already add this recipe to favorite');
                conn.close();
                cb({status:400, message: "User already add this recipe to favorite"});
            } else {
                newRecipe.save((err, result)=> {
                    if (err) return console.error(err);
                    console.log('User add this recipe to favorite successfully');
                    conn.close();
                    cb({status:201, data:result});
                });
            }
        });
    });
}

const removeRecipeFromFavorite = (data,cb)=>{
    //craete connections
    const conn = mongoose.createConnection(DATABASE_URL);
    const Recipe = conn.model('Recipe', RecipeSchema);
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', function () {
        //Find if there is any exist username
        Recipe.deleteOne({ id: data['id'],uid:data['uid']}, function (err, result) {
            if (err) return console.error(err);
            console.log('User remove this recipe from favorite successfully');
            conn.close();
            cb({status:201, data:result});
        });
    });
}



const getAllFavoriteRecipes = (uid,cb)=>{
    //craete connections
    const conn = mongoose.createConnection(DATABASE_URL);
    const Recipe = conn.model('Recipe', RecipeSchema);
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', function () {
        //Find if there is any exist username
        Recipe.find({uid:uid}, function (err, result) {
            if (err) return console.error(err);
            conn.close();
            cb({status:200, data:result});
        });
    });
}

const db_api={
    createAccount,
    login,
    addRecipeToFavorite,
    removeRecipeFromFavorite,
    getAllFavoriteRecipes,
}


export default db_api;
