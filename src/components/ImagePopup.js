import React from 'react';

const ImagePopup = ({ selectedCard, onClose }) => {
  return (
    <div className={`popup popup_img ${selectedCard.isOpened ? 'popup_opened' : ''}`}>
      <figure className="img-item">
        <img className="img-view" src={selectedCard.link} alt={selectedCard.name} />
        <figcaption className="img-caption">{selectedCard.name}</figcaption>
        <button
          type="button"
          className="popup__close popup__close_img"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}

export default ImagePopup;