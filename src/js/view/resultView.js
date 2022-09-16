import view from './view';
import PreviewView from './PreviewView';
import icon from '../../img/icons.svg';

class ResultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMesage = `No recipe found for your query! Please try again`;
  _message = ' ';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}

export default new ResultView();
