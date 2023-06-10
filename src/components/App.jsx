import { useEffect } from 'react';
import { useState } from 'react';
import { api } from 'service/Api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [status, setStatus] = useState('idle');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!searchName) {
      return;
    }

    async function getImages() {
      setStatus('pending');

      const response = await api.fetchResponce(searchName, page);

      if (response.hits <= 0) {
        toast.error(`No hemos encontrado "${searchName}"`);
        return;
      }
      if (page === 1) {
        toast.success(
          `Nosotros encontró "${response.total}" fotos "${searchName}"`
        );
      }

      setPictures(prevPictures => [...prevPictures, ...response.hits]);
      setIsVisibleBtn(true);
      setStatus('resolved');
      setTotal(response.total);
    }
    getImages();
  }, [searchName, page]);

  const hendleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setPictures([]);
    setStatus('idle');
    setIsVisibleBtn(false);
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={hendleFormSubmit} />

      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} openModal={openModal} />
      )}

      {status === 'pending' && pictures.length !== 0 && <Loader />}

      {status === 'resolved' && isVisibleBtn && pictures.length !== total && (
        <Button loadMore={loadMore} />
      )}

      {showModal ? (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      ) : null}

      <ToastContainer />
    </>
  );
}
