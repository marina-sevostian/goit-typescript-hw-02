import Modal from 'react-modal';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import s from './ImageModal.module.css';

const ImageModal = ({ isOpen, onCloseModal, image }) => {
  return (
    <Modal
      overlayClassName={s.backdrop}
      className={s.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      <button className={s.closeBtn} onClick={onCloseModal}>
        <LiaWindowCloseSolid size="35" />
      </button>
      {image && (
        <div className={s.wrapImg}>
          <img
            className={s.img}
            src={image.urls.regular}
            alt={image.alt_description}
          />
          <div className={s.imgInfo}>
            <p className={s.descripImg}>
              <span className={s.titleDescrip}>Description:</span>{' '}
              {image.description}
            </p>
            <p className={s.descripImg}>
              <span className={s.titleDescrip}>Image author:</span>{' '}
              {image.user.name}
            </p>
            <p className={s.descripImg}>
              <span className={s.titleDescrip}>Image author location:</span>{' '}
              {image.user.location}
            </p>
            <p className={s.descripImg}>
              <span className={s.titleDescrip}>Image likes:</span> {image.likes}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
