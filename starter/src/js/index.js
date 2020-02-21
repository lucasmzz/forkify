import Search from './models/Search';

const search = new Search('pizza');

document.querySelector('.search__btn').addEventListener('click',(e) => {
    e.preventDefault();
    search.getResults();
});