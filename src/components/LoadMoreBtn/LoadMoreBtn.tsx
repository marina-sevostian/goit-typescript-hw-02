import s from './LoadMoreBtn.module.css';

type Props = {
  changePage: () => void;
};

const LoaderMoreBtn = ({ changePage }: Props) => {
  return (
    <button className={s.btn} onClick={changePage}>
      Load more
    </button>
  );
};

export default LoaderMoreBtn;
