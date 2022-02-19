import React from 'react';
import Recipe_data from '../../models/recipe.model';
import recipes_api from '../../services/recipe.service';
import Side_Canvas from '../../shared/components/sidecanvas';
import Recipe_Card from './recipies-card';
import Slide from '@mui/material/Slide';
import Recipe_Detail from './recipie-detail';
import { deleteRequest, getRequest, postRequest } from '../../services/database.service';
import Recipe_Favor_List from './recipe-favor-list';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes_arr: [new Recipe_data({
                calories: 4228.043058200812,
                cautions: ['Sulfites'],
                cuisineType: ['italian'],
                dietLabels: ['Low-Carb'],
                dishType: ['main course'],
                image: "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
                ingredients: ['ss'],
                label: "Chicken Vesuvio",
                mealType: ['lunch/dinner'],
                totalTime: 60,
                totalWeight: 2976.8664549004047,
                uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6",
                yield: 4
            }, 0), new Recipe_data({
                calories: 4228.043058200812,
                cautions: ['Sulfites'],
                cuisineType: ['italian'],
                dietLabels: ['Low-Carb'],
                dishType: ['main course'],
                image: "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
                ingredients: ['ss'],
                label: "Chicken Vesuvio",
                mealType: ['lunch/dinner'],
                totalTime: 60,
                totalWeight: 2976.8664549004047,
                uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838a4cfd9576b30b6",
                yield: 4
            }, 1), new Recipe_data({
                calories: 4228.043058200812,
                cautions: ['Sulfites'],
                cuisineType: ['italian'],
                dietLabels: ['Low-Carb'],
                dishType: ['main course'],
                image: "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
                ingredients: ['ss'],
                label: "Chicken Vesuvio",
                mealType: ['lunch/dinner'],
                totalTime: 60,
                totalWeight: 2976.8664549004047,
                uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b338ad6cfd9576b30b6",
                yield: 4
            }, 2), new Recipe_data({
                calories: 4228.043058200812,
                cautions: ['Sulfites'],
                cuisineType: ['italian'],
                dietLabels: ['Low-Carb'],
                dishType: ['main course'],
                image: "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
                ingredients: ['ss'],
                label: "Chicken Vesuvio",
                mealType: ['lunch/dinner'],
                totalTime: 60,
                totalWeight: 2976.8664549004047,
                uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b86b838ad6cfd9576b30b6",
                yield: 4
            }, 3),
            new Recipe_data({
                calories: 4228.043058200812,
                cautions: ['Sulfites'],
                cuisineType: ['italian'],
                dietLabels: ['Low-Carb'],
                dishType: ['main course'],
                image: "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
                ingredients: ['ss'],
                label: "Chicken Vesuvio",
                mealType: ['lunch/dinner'],
                totalTime: 60,
                totalWeight: 2976.8664549004047,
                uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d06Ab8e5b838ad6cfd9576b30b6",
                yield: 4
            }, 4), new Recipe_data({
                calories: 4228.043058200812,
                cautions: ['Sulfites'],
                cuisineType: ['italian'],
                dietLabels: ['Low-Carb'],
                dishType: ['main course'],
                image: "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
                ingredients: ['ss'],
                label: "Chicken Vesuvio",
                mealType: ['lunch/dinner'],
                totalTime: 60,
                totalWeight: 2976.8664549004047,
                uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_bQ9327d05b8e5b838ad6cfd9576b30b6",
                yield: 4
            }, 5)],
            canvasIsShow: false, firstIndex: 0, subSectionChoice: 0, selectedIndex: 0,
            favoriteRecipe_arr: []
        }
        this.myRef = React.createRef();
    }
    handleCanvasShow = () => {
        this.setState({ canvasIsShow: true });
    }
    handleCanvasClose = () => {
        this.setState({ canvasIsShow: false });
    }
    handleMoveleft = () => {
        this.setState((preState) => {
            const newIndex = preState.firstIndex + 1 === preState.recipes_arr.length ? 0 : preState.firstIndex + 1;
            return { firstIndex: newIndex }
        });
    }
    handleMoveright = () => {
        this.setState((preState) => {
            const newIndex = preState.firstIndex === 0 ? 0 : preState.firstIndex - 1;
            return { firstIndex: newIndex }
        });
    }
    viewDetail = (index) => {
        this.setState({ subSectionChoice: 1, selectedIndex: index });
    }
    returnToHome = () => {
        this.setState({ subSectionChoice: 0 });
    }

    addToFavorite = (data) => {
        postRequest("/addRecipeToFavorite", data).then((return_data) => {
            if (return_data.status === 201) {
                this.getUserFavoriteRecipes();
            } else {
                alert("could not add to favorite");
            }
        })
    }
    removeFromFavorite = (id) => {
        console.log(id);
        deleteRequest("/removeRecipeFromFavorite", id).then((return_data) => {
            if (return_data.status === 201) {
                this.getUserFavoriteRecipes();
            } else {
                alert("could not remove from favorite");
            }
        });
    }


    getUserFavoriteRecipes = () => {
        getRequest("/getAllFavoriteRecipes").then((return_data) => {
            console.log("return_data:", return_data);
            if (return_data.status === 200) {
                const recipes_id = return_data.data.map((item) => item['id']);
                this.setState({ favoriteRecipe_arr: recipes_id });
            } else {
                alert("could not get the recipes data");
            }
        });
    }

    goToMyFavoriteList = ()=>{
        this.setState({subSectionChoice:2});
    }


    toggleFavorite = (index) => {
        //get the id first and use the id to identify if it is in favorite or not
        const id = this.state.recipes_arr[index].id;
        //if it is already favorite, then cancel it
        //if it is not in favorite, then add to favorite.

        if (this.state.favoriteRecipe_arr.includes(id)) {
            //remove from favorite
            this.removeFromFavorite(id);
        } else {
            //add to favorite
            this.addToFavorite(this.state.recipes_arr[index]);
        }
    }

    render() {
        const all_recipes_cards = this.state.recipes_arr?.filter((item) => {
            return (this.state.firstIndex <= item.index) && (item.index < this.state.firstIndex + 4)
        }).map((item) =>
            <Slide key={item.id} direction="up"
                in={(this.state.firstIndex <= item.index) && (item.index < this.state.firstIndex + 4)}
                out={(this.state.firstIndex > item.index) || (item.index >= this.state.firstIndex + 4)}
                container={this.myRef.current}>
                <div><Recipe_Card favor={this.state.favoriteRecipe_arr.includes(item['id'])} data={item} viewDetail={this.viewDetail} toggleFavorite={this.toggleFavorite} /></div>
            </Slide>
        );
        /*
        const all_recipes_cards = this.state.recipes_arr?.filter( (item)=>{
            return (this.state.firstIndex <= item.index) && (item.index< this.state.firstIndex+4)
        }).map((item)=> 
            <Recipe_Card key={item.id} data={item} />
        );
        */

        let recipe_selection;
        switch (this.state.subSectionChoice) {
            case 0:
                recipe_selection =
                    <>
                        <button className='leftarrow_button' onClick={this.handleMoveleft}></button>
                        <button className='rightarrow_button' onClick={this.handleMoveright}></button>
                        {all_recipes_cards}
                    </>
                break;
            case 1:
                recipe_selection = <Recipe_Detail toggleFavorite={this.toggleFavorite} favor={this.state.favoriteRecipe_arr.includes(this.state.recipes_arr[this.state.selectedIndex]["id"])} data={this.state.recipes_arr[this.state.selectedIndex]} returnToHome={this.returnToHome} />
                break;
            case 2:
                recipe_selection = <Recipe_Favor_List returnToHome={this.returnToHome} />;
                break;
            default:
                recipe_selection = <></>;
                break;
        }
        return (
            <section className='recipes_container' ref={this.myRef}>
                <button className='offcanvas_button' onClick={this.handleCanvasShow}></button>
                {recipe_selection}
                <Side_Canvas handleCanvasClose={this.handleCanvasClose} canvasIsShow={this.state.canvasIsShow} />
            </section>
        )
    }
    componentDidMount() {
        this.getAllRecipes();
        this.getUserFavoriteRecipes();
    }
    getAllRecipes() {
        /*
        recipes_api.getAllRecipes("chicken").
        then((data) =>{
            //console.log(data);
            this.setState({recipes_arr:data.hits.map((item)=>new Recipe_data(item.recipe))});
        });
        */
    }
}

export default Recipes;