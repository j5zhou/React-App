class Recipe_data{
    constructor(data,index){
        this.id=data['uri'].substring(data['uri'].indexOf("#")+1);
        this.image=data['image'];
        this.calories=data['calories'];
        this.cuisineType=data['cuisineType'];
        this.ingredients=data['ingredients'];
        this.totalTime=data['totalTime'];
        this.label=data['label'];
        this.index= index;
    }
}

export default Recipe_data;