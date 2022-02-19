import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

class Recipe_Card extends React.Component {
    constructor(props) {
        super(props);
    }
    showDetail = ()=>{
        this.props.viewDetail(this.props.data['index']);
    }

    toggleFavorite = ()=>{
        this.props.toggleFavorite(this.props.data.index);
    }

    render() {
        const colorType = this.props.favor ? "error": "inherit";
        return (
            <Card className="recipe_card" >
                <Card.Img variant="top" className="recipe_card_img" srcSet={this.props.data['image']} />
                <Card.Body>
                    <Card.Title>{this.props.data['label']}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <div className="flex-container">
                    <Button variant="primary" onClick={this.showDetail}>View Detail</Button>
                    <IconButton aria-label="add to favorites" onClick={this.toggleFavorite} color={colorType}> 
                        <FavoriteIcon />
                    </IconButton>
                    </div>
                </Card.Body>
            </Card>
            
        )
    }
}

export default Recipe_Card;