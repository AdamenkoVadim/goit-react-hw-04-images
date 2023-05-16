import css from "components/ImageGalleryItem/ImageGalleryItem.module.css"
import React from "react"
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
    largeImageURL,
    webformatURL,
    openModal,
    alt,
    }) => {
        return (
            <li className={css.imageGalleryItem} onClick={() => openModal(largeImageURL)}>
                <img className={css.imageGalleryItem__image} src={webformatURL} alt={alt} />
            </li>
    );
};

ImageGalleryItem.propTypes = {
    alt: PropTypes.string,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
  };