import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
  
    const handleEditAvatarClick = () => {
      setIsEditAvatarPopupOpen(true);
    };
  
    const handleEditProfileClick = () => {
      setIsEditProfilePopupOpen(true);
    };
  
    const handleAddPlaceClick = () => {
      setIsAddPlacePopupOpen(true);
    };
  
    const handleCardClick = (card) => {
      setSelectedCard({
        isOpened: true,
        name: card.name,
        link: card.link,
      });
    };
  
    function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard({ ...selectedCard, isOpened: false });
    }
    
    return (
        <body className='page'>
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />

        </body>
    );
}

export default App;
