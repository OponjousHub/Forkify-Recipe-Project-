class SearchView {
  _searchParentEl = document.querySelector('.search');

  getQuery() {
    const query = this._searchParentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchParentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._searchParentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
