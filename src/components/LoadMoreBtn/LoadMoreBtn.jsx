import s from './LoadMoreBtn.module.css';
const LoaderMoreBtn = ({ changePage }) => {
  return (
    <button className={s.btn} onClick={changePage}>
      Load more
    </button>
  );
};

export default LoaderMoreBtn;
