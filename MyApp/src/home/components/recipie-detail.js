import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

class Recipe_Detail extends React.Component {
    constructor(props) {
        super(props);
    }
    returnFromDetail = () => {
        this.props.returnToHome();
    }

    toggleFavorite = () => {
        this.props.toggleFavorite(this.props.data.index);
    }

    render() {
        const colorType = this.props.favor ? "error" : "inherit";
        const { label, image, calories, cuisineType, ingredients, totalTime } = this.props.data;
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
                                <source media="(min-width:650px)" srcset={image} />
                                <img src={image} alt={label} />
                            </picture>
                        </div>
                        <div>
                            <label className="label-text">Cuisine Type:</label>
                            {cuisineType.map((item) => <label className="label-text" key={item}>{item}</label>)}
                        </div>
                        <div>
                            <label className="label-text">Calories:</label><label className="label-text">{parseInt(calories)}</label>
                        </div>
                        <div>
                            <label className="label-text">Total Cooked Time:</label ><label className="label-text">{totalTime} Min</label>
                        </div>
                    </section>
                    <section className="recipe_detail_content-right">
                        <div>
                            <label className="label-text">Ingredients:</label>
                            {ingredients.map((item) => <div className="label-text" key={item}>{item}</div>)}
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}

export default Recipe_Detail;