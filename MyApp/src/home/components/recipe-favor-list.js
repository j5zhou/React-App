import React from "react";

class Recipe_Favor_List extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            favoriteRecipe_arr:[]
        }
    }

    componentDidMount = ()=>{
        this.getUserFavoriteRecipes();
    }
    getUserFavoriteRecipes = () => {
        getRequest("/getAllFavoriteRecipes").then((return_data) => {
            console.log("return_data:", return_data);
            if (return_data.status === 200) {
                const recipes = return_data.data.map((item,index) => {
                    const newObj = {...item,index:index}
                    return newObj;
                });
                this.setState({ favoriteRecipe_arr: recipes });
            } else {
                alert("could not get the recipes data");
            }
        });
    }

    render() {
        //const items_ls = this.state.favoriteRecipe_arr.map((item)=>   )
        return (
            <section className="recipe_favor_list">
                <section className="recipe_favor_list-col1">

                </section>
                <section className="recipe_favor_list-col2">

                </section>
                <section className="recipe_favor_list-col3">

                </section>
                <section className="recipe_favor_list-col4">

                </section>
                
            </section>
        )
    }
}

export default Recipe_Favor_List;