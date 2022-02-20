import React from "react";
import { deleteRequest, getRequest, postRequest } from '../../services/database.service';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from "../../shared/components/alertDialog";

class Recipe_Favor_List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteRecipe_arr: [],
            selectedIndex: 0,
            alertOpen: false,
            deletedIndex: 0,
        }
    }

    componentDidMount = () => {
        this.getUserFavoriteRecipes();
    }
    getUserFavoriteRecipes = () => {
        getRequest("/getAllFavoriteRecipes").then((return_data) => {
            console.log("return_data:", return_data);
            if (return_data.status === 200) {
                const recipes = return_data.data.map((item, index) => {
                    const newObj = { ...item, index: index }
                    return newObj;
                });
                this.setState({ favoriteRecipe_arr: recipes });
            } else {
                alert("could not get the recipes data");
            }
        });
    }
    switchToAnotherRecipe = (index) => {
        this.setState({ selectedIndex: index });
    }
    handleOpen = ()=>{
        this.setState({alertOpen:true});
    }
    handleClose = ()=>{
        this.setState({alertOpen:false});
    }
    handleConfirm = ()=>{
        this.setState({alertOpen:false});
        this.removeFromFavorite(this.state.favoriteRecipe_arr[this.state.deletedIndex]["id"]);
    }

    removeFromFavorite = (id) => {
        console.log(id);
        
        deleteRequest("/removeRecipeFromFavorite", id).then((return_data) => {
            if (return_data.status === 201) {
                if(this.state.deletedIndex === this.state.selectedIndex){
                    this.setState({selectedIndex:0});
                }
                this.getUserFavoriteRecipes();
            } else {
                alert("could not remove from favorite");
            }
        });
        
    }

    deleteThisRecipe = (index)=>{
        this.state.deletedIndex = index;
        this.handleOpen();
    }

    returnToHome = ()=>{
        this.props.returnToHome();
    }


    render() {
        const items_ls = this.state.favoriteRecipe_arr.map((item) => {
            const classls = item.index === this.state.selectedIndex ? "active recipe_favor_list-option" : "recipe_favor_list-option";
            return <div key={item.id}>
                <button onClick={() => this.switchToAnotherRecipe(item["index"])} key={item['id']} className={classls}>{item['label']}</button>
                <IconButton aria-label="delete" onClick={()=>this.deleteThisRecipe(item.index)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        })
        const { label, image, calories, cuisineType, ingredients, totalTime } = this.state.favoriteRecipe_arr.length > 0 ?
            this.state.favoriteRecipe_arr[this.state.selectedIndex] :
            { label: "", image: "", calories: "", cuisineType: [], ingredients: [], totalTime: "" };

        const description = this.state.favoriteRecipe_arr.length > 0 ? "Are you sure to remove "+this.state.favoriteRecipe_arr[this.state.deletedIndex]['label']+" from favorite?"
        : "";

        return (
            <section className="recipe_favor_list">
                <button className="return-btn" onClick={this.returnToHome}></button>
                <section className="recipe_favor_list-col1">
                    {items_ls}
                </section>
                <section className="recipe_favor_list-col2">
                    <picture>
                        <source media="(min-width:650px)" srcset={image} />
                        <img src={image} alt={label} />
                    </picture>
                </section>
                <section className="recipe_favor_list-col3">
                    <div>
                        <label className="label-text">Cuisine Type:</label>
                        {cuisineType.map((item) => <label className="label-text" key={item}>{item}</label>)}
                    </div>
                    <div>
                        <label className="label-text">Calories:</label><label className="label-text">{parseInt(calories)}</label>
                    </div>
                    <div>
                        <label className="label-text">Total Cooked Time:</label><label className="label-text">{totalTime} Min</label>
                    </div>
                </section>
                <section className="recipe_favor_list-col4">
                    <div>
                        <label className="label-text">Ingredients:</label>
                        {ingredients.map((item) => <div className="label-text" key={item}>{item}</div>)}
                    </div>
                </section>
                <AlertDialog open={this.state.alertOpen} handleConfirm={this.handleConfirm} handleClose={this.handleClose}  description={description} title="Remove Favorite Recipe"/>

            </section>
        )
    }
}

export default Recipe_Favor_List;