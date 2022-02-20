import React from 'react';
import Recipe_data from '../../models/recipe.model';
import recipes_api from '../../services/recipe.service';
import Side_Canvas from '../../shared/components/sidecanvas';
import Recipe_Card from './recipies-card';
import Grow from '@mui/material/Grow';

import Recipe_Detail from './recipie-detail';
import { deleteRequest, getRequest, postRequest } from '../../services/database.service';
import Recipe_Favor_List from './recipe-favor-list';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasIsShow: false, firstIndex: 0, subSectionChoice: 0, selectedIndex: 0,
            favoriteRecipe_arr: [],
        }
        this.myRef = React.createRef();
        this.eachPageCount = 4;
    }

    handleCanvasShow = () => {
        this.setState({ canvasIsShow: true });
    }
    handleCanvasClose = () => {
        this.setState({ canvasIsShow: false });
    }


    //left arrow, right arrow, and pagniation
    handleMoveleft = () => {
        this.setState((preState) => {
            const newIndex = preState.firstIndex === 0 ? 0 : preState.firstIndex - 1;
            return { firstIndex: newIndex }
        });
    }
    handleMoveright = () => {
        this.setState((preState) => {
            const newIndex = preState.firstIndex + 1 === this.props.queryData.length ? 0 : preState.firstIndex + 1;
            return { firstIndex: newIndex }
        });
    }
    handlePageJump = (event, index) => {
        this.setState({ firstIndex: (index - 1) * this.eachPageCount });
    }



    viewDetail = (index) => {
        console.log(this.props.queryData);
        this.setState({ subSectionChoice: 1, selectedIndex: index });
    }
    returnToHome = () => {
        this.getUserFavoriteRecipes();
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

    goToMyFavoriteList = () => {
        this.setState({ subSectionChoice: 2 });
    }


    toggleFavorite = (index) => {
        //get the id first and use the id to identify if it is in favorite or not
        const id = this.props.queryData[index].id;
        //if it is already favorite, then cancel it
        //if it is not in favorite, then add to favorite.

        if (this.state.favoriteRecipe_arr.includes(id)) {
            //remove from favorite
            this.removeFromFavorite(id);
        } else {
            //add to favorite
            this.addToFavorite(this.props.queryData[index]);
        }
    }

    render() {
        /*
        <Slide key={item.id} direction="up"
                in={(this.state.firstIndex <= item.index) && (item.index < this.state.firstIndex + 4)}
                out={(this.state.firstIndex > item.index) || (item.index >= this.state.firstIndex + 4)}
                container={this.myRef.current}>
                <div><Recipe_Card favor={this.state.favoriteRecipe_arr.includes(item['id'])} data={item} viewDetail={this.viewDetail} toggleFavorite={this.toggleFavorite} /></div>
            </Slide>
        */

        const totalPageNumber = Math.ceil(this.props.queryData.length / this.eachPageCount);

        const all_recipes_cards = this.props.queryData?.filter((item) => {
            return (this.state.firstIndex <= item.index) && (item.index < this.state.firstIndex + 4)
        })?.map((item,index) =>
                <Grow key={item.id}
                    in={(this.state.firstIndex <= item.index) && (item.index < this.state.firstIndex + 4)}
                    style={{ transformOrigin: '0 0 0' }}
                    {...((this.state.firstIndex <= item.index) && (item.index < this.state.firstIndex + 4) ? { timeout: 300+1250* index } : {})}
                >
                    <div><Recipe_Card favor={this.state.favoriteRecipe_arr.includes(item['id'])} data={item} viewDetail={this.viewDetail} toggleFavorite={this.toggleFavorite} /></div>
                </Grow>

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
                recipe_selection = <Recipe_Detail toggleFavorite={this.toggleFavorite} favor={this.state.favoriteRecipe_arr.includes(this.props.queryData[this.state.selectedIndex]["id"])} data={this.props.queryData[this.state.selectedIndex]} returnToHome={this.returnToHome} />
                break;
            case 2:
                recipe_selection = <Recipe_Favor_List returnToHome={this.returnToHome} />;
                break;
            default:
                recipe_selection = <></>;
                break;
        }

        return (
            <section className='main-section'>
                <button className='offcanvas_button' onClick={this.handleCanvasShow}></button>
                { this.state.subSectionChoice !== 0 && <button className="return-btn" onClick={this.returnToHome}></button>}
                <section className='recipes_container' ref={this.myRef}>
                    {recipe_selection}
                    <Side_Canvas handleCanvasClose={this.handleCanvasClose} goToMyFavoriteList={this.goToMyFavoriteList} canvasIsShow={this.state.canvasIsShow} />
                </section>
                {this.state.subSectionChoice === 0 && <section className='pagination'>
                    <Stack spacing={2}>
                        <Pagination count={totalPageNumber} color="secondary" onChange={this.handlePageJump} page={Math.floor(this.state.firstIndex / this.eachPageCount) + 1} />
                    </Stack>
                </section>
                }
            </section>
        )
    }
    componentDidMount() {
        this.getUserFavoriteRecipes();
    }
}

export default Recipes;