//const baseurl = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=fa6bae9e&app_key=cba1280f2ff34eaa011489aefbd2a80a"
const baseurl = "https://api.edamam.com/api/recipes/v2?type=public";
const app_id = "7370e191";
const app_key = "716121d129917432548b8ef341e843b7";
const getAllRecipes = (query,options)=>
    fetch(`${baseurl}&q=${query}&app_id=${app_id}&app_key=${app_key}${options}`,{
        credentials: 'include',
        method: "GET",
        headers: {
            'Accept': 'application/json',
        },
      }).then((response) => response.json())

const recipes_api = {
    getAllRecipes,
}

export default recipes_api;