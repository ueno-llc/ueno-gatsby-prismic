import React, { Component } from 'react';
import s from './SearchBar.scss';

export default class SearchBar extends Component {

  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.search();
    }
  }

  search = () => {
    // const { history } = this.props;
    // history.push(`/search/${this.input.value}`);
  }

  onClose = () => null;

  render() {

    return (
      <div className={s.search}>
        <input
          ref={this.inputRef}
          className={s.search__input}
          type="text"
          placeholder="Search..."
          onKeyDown={this.onKeyDown}
          onBlur={this.onClose}
        />
      </div>
    );
  }
}
