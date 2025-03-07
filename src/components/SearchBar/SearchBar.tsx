import { IoSearchSharp } from 'react-icons/io5';
import s from './SearchBar.module.css';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

type Props = {
  setQuery: (value: string) => void;
};

const SearchBar = ({ setQuery }: Props) => {
  const handleSumbmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.elements.namedItem('query') as HTMLInputElement;
    if (!query || !query.value.trim()) {
      return toast.error(
        'The field is empty, enter text to search for an image.'
      );
    }
    setQuery(query.value.trim());
    form.reset();
  };
  return (
    <header>
      <form className={s.form} onSubmit={handleSumbmit}>
        <input
          className={s.input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={s.btn} type="submit">
          <IoSearchSharp size="20" />
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
