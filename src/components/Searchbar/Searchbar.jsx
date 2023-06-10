import { useState } from 'react';
import css from 'components/Searchbar/Searchbar.module.css';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';

export function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const hendleChangeName = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const hendleSubmit = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      toast.warn('Por favor escribe algo!!!');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={hendleSubmit}>
        <button type="submit" className={css.SearchForm__button}>
          <AiOutlineSearch size={32} />
        </button>

        <input
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={hendleChangeName}
        />
      </form>
    </header>
  );
}
