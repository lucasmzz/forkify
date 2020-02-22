import Search from './models/Search';
import * as SearchView from './views/SearchView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

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

const search = new Search('pizza');

elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
});