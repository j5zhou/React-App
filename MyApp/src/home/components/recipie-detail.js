import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

class Recipe_Detail extends React.Component {
    constructor(props) {
        super(props);
    }
    returnFromDetail = ()=>{
        this.props.returnToHome();
    }

    toggleFavorite = ()=>{
        this.props.toggleFavorite(this.props.data.index);
    }

    render() {
        const colorType = this.props.favor ? "error": "inherit";
        const {label,image,calories,cuisineType,ingredients,totalTime} = this.props.data;
        return (
            <section className="recipe_detail">
                <h2 className="recipe_detail_label">{label}
                    <IconButton aria-label="add to favorites" color={colorType} onClick={this.toggleFavorite}>
                        <FavoriteIcon />
                    </IconButton>
                    <button className="return-btn" onClick={this.returnFromDetail}></button>
                </h2>
                <section className="recipe_detail_content">
                    <section className="recipe_detail_content-left">
                        <div>
                        <picture>
                            <source media="(min-width:650px)" srcset={image}/>
                            <img src={image} alt={label}/>
                        </picture>    
                        </div>
                        <div>
                            <label>Cuisine Type:</label>
                            <label>{cuisineType.map((item)=> <label key={item}>{item}</label>)}</label>
                        </div>
                        <div>
                            <label>Ingredients:</label>
                            <label>{ingredients.map((item)=> <label key={item}>{item}</label>)}</label>
                        </div>
                    </section>
                    <section className="recipe_detail_content-right">
                        <div>
                            <label>Calories:</label><label>{calories}</label>
                        </div>
                        <div>
                            <label>Total Cooked Time:</label><label>{totalTime}</label>
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}

export default Recipe_Detail;