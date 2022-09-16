import view from './view';
import PreviewView from './PreviewView';
import icon from '../../img/icons.svg';

class BookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMesage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = ' ';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
