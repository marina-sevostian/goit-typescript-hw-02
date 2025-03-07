import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import fetchImages from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import LoaderMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import './App.css';
import Modal from 'react-modal';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectImage, setSelectImage] = useState(0);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setImage(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = searchValue => {
    setQuery(searchValue);
    setImage([]);
    setPage(1);
  };

  const handleChangePage = () => {
    setPage(prev => prev + 1);
  };

  const openModal = image => {
    setSelectImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar setQuery={handleSetQuery} />
      <Toaster position="top-left" />
      {isError && <ErrorMessage />}
      <ImageGallery images={image} openModal={openModal} />
      {isLoading && <Loader />}
      {image.length > 0 && page < totalPages && (
        <LoaderMoreBtn changePage={handleChangePage} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onCloseModal={closeModal}
        image={selectImage}
      />
    </>
  );
}

export default App;
