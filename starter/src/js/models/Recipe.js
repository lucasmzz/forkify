import axios from 'axios';
import { proxy } from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            this.calcTime();
            this.calcServings();
        }catch(error){
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    updateServings(type){
        const newServings = type === 'dec' ? this.servings -1 : this.servings + 1;
        this.servings = newServings;
    }
    
}