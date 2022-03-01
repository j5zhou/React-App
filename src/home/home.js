import React from 'react';
import ReactDOM from 'react-dom';
import Home_footer from '../shared/components/home-footer';
import Home_header from '../shared/components/home-header';
import Recipes from './components/recipies';
import Recipe_data from '../models/recipe.model';
import recipes_api from '../services/recipe.service';

const QueryContext = React.createContext({});
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={query:"",options:{selectedCuisine:"All"},data:[],selectionState:0};
        this.allTypesRecipes = ["American","Asian","Chinese","Japanese","French","Mexican","Indian"];
    }


    changeSelectionState = (index)=>{
        this.setState({selectionState:index});
    }

    changeQuery = (obj)=>{
        this.setState({...obj});
        this.getAllRecipes(obj);
    }
    getAllRecipes(obj) {
        const selectedCuisine = obj.options.selectedCuisine;
        console.log(obj);
        if(selectedCuisine=="All" && obj.query){
            recipes_api.getAllRecipes(obj.query,"").then((data) =>{
                console.log(data);
                this.setState({data:data.hits.map((item,index)=>new Recipe_data(item.recipe,index))});
                this.changeSelectionState(0);
        });
            
        }else if(obj.query){
            //console.log(selectedCuisine.substr(0,selectedCuisine.indexOf(" ")));
            const options = `&cuisineType=${selectedCuisine.substr(0,selectedCuisine.indexOf(" "))}`
            recipes_api.getAllRecipes(obj.query,options).then((data) =>{
                console.log(data);
                this.setState({data:data.hits.map((item,index)=>new Recipe_data(item.recipe,index))});
                this.changeSelectionState(0);
            });
        }
    }
    getRandomType = ()=>{
        const rand = Math.floor(Math.random() * this.allTypesRecipes.length)
        return this.allTypesRecipes[rand];
    }
    getRandomRecipes=()=>{
        const q = this.getRandomType();
        const options = `&random=true`;
            recipes_api.getAllRecipes(q,options).then((data) =>{
                console.log(data);
                this.setState({data:data.hits.map((item,index)=>new Recipe_data(item.recipe,index))});
                this.changeSelectionState(0);
        });
    }
    getTypeRandomRecipes=(recipe_type)=>{
        const q = recipe_type;
        const options = `&cuisineType=${recipe_type}&random=true`;
            recipes_api.getAllRecipes(q,options).then((data) =>{
                console.log(data);
                this.setState({data:data.hits.map((item,index)=>new Recipe_data(item.recipe,index))});
                this.changeSelectionState(0);
        });
    }


    componentDidMount = ()=>{
        this.getRandomRecipes();
    }
    //{query:this.state.query,options:this.state.options}
    render(){
        return (
            <>
            <Home_header changeQuery={this.changeQuery} getTypeRandomRecipes={this.getTypeRandomRecipes}/>
            <main>
                <Recipes queryData={this.state.data} changeSelectionState={this.changeSelectionState} selectionState={this.state.selectionState}  />
            </main>
            <Home_footer/>

            </>
        )
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
);

export {QueryContext};