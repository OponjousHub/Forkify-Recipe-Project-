import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './module.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';
import recipeView from './view/recipeView.js';
import resultView from './view/resultView.js';
import searchView from './view/searchView.js';
import addRecipeView from './view/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// if(module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();

    // 1) Update results view to mark selected search result
    resultView.update(model.getSearchResultPage());

    // 2) Updating bookmark view
    bookmarksView.update(model.state.bookmarks);

    // 3) calling Loadrecipe /////
    await model.loadRecipe(id);

    // 4) Render Recipe //////
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ///// Load spiner ///////////
    resultView.renderSpiner();
    // recipeView._generateMarkup();

    // Get search Query////////////
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results //////
    await model.loadSearchResult(query);

    // Render Results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPage());

    // Render initial pagination view
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  // Render Results NEW Pagination
  resultView.render(model.getSearchResultPage(goToPage));

  // Render initial pagination view
  paginationView.render(model.state.search);
};

const controlServings = function (updateTo) {
  // Update the recipe servings in the state
  model.updateServings(updateTo);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove Bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //Update recipe view
  recipeView.update(model.state.recipe);

  //Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    // Render spinner
    addRecipeView.renderSpiner();
    // Upload the nw recipe
    await model.uploadRecipe(newRecipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render Bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back();

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('@@##', err);
    addRecipeView.renderError(err.message);
  }
};

const myFeature = function () {
  console.log('welcome to the application!');
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  bookmarksView.addHandlerRender(controlBookmarks);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerBookmark(controlAddBookmark);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
  myFeature();
};
init();
