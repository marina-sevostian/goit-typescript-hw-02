import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import fetchImages from '../../services/api';
import ImageGallery from '../ImageGallery/ImageGallery';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';
import LoaderMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import './App.css';
import Modal from 'react-modal';
import ImageModal from '../ImageModal/ImageModal';
import { Image } from './App.type';

interface ImageData {
  total_pages: number;
  total: number;
  results: Image[];
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [image, setImage] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectImage, setSelectImage] = useState<Image | null>(null);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    if (!query) return;
    const getData = async (): Promise<void> => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data: ImageData | undefined = await fetchImages(query, page);
        if (!data) {
          throw new Error('No data received from the API');
        }

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

  const handleSetQuery = (searchValue: string): void => {
    setQuery(searchValue);
    setImage([]);
    setPage(1);
  };

  const handleChangePage = (): void => {
    setPage(prev => prev + 1);
  };

  const openModal = (image: Image): void => {
    setSelectImage(image);
    setIsOpen(true);
  };

  const closeModal = (): void => {
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
