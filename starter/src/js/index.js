import Search from './models/Search';
import Recipe from './models/Recipe';
import * as SearchView from './views/SearchView';
import * as RecipeView from './views/RecipeView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};


// SEARCH CONTROLLER
const controlSearch = async () => {

    const query = SearchView.getInput();

    if (query){
        //new Search Model instance stored in app state
        state.search = new Search(query);

        //Prepare UI for results
        SearchView.clearInput();
        SearchView.clearResults();
        renderLoader(elements.searchRes);

        //fetch results into app state
        await state.search.getResults();
        
        //Render results on UI
        clearLoader();
        SearchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        SearchView.clearResults();
        SearchView.renderResults(state.search.result, goToPage);
    }
});

// RECIPE CONTROLLER
const controlRecipe = async () => {  
    const id = window.location.hash.replace('#', '');
    
    // save Recipe in State
    if (id){
        state.recipe = new Recipe(id);
        
        // Prepare UI 
        RecipeView.clearResult();
        renderLoader(elements.recipePane);

        // fetch recipe details
        await state.recipe.getRecipe();
        // Render recipe on UI
        clearLoader();
        RecipeView.renderRecipe(state.recipe);
    }
};

window.addEventListener('hashchange', controlRecipe);