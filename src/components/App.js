import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils/Api';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setcurrentUser] = useState({});
    const [cards, setCards] = useState([]);

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

    useEffect(() => {
        api
            .getProfile()
            .then((res) => setcurrentUser(res))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        api
            .getCards()
            .then((cards) => setCards(cards))
            .catch((err) => console.log(err));
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        const changeLikeCardStatus = !isLiked
        ? api.addLike(card._id)
        : api.deleteLike(card._id);
        changeLikeCardStatus
        .then((newCard) => {
            setCards((item) => item.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.log(`???????????? ${err}`));
    }

    const handleCardDelete = (card) => {
        api
        .deleteCard(card._id)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id !==card._id));
            closeAllPopups();
        })
        .catch((err) => console.log(`???????????? ${err}`))
        .finally(() => {});
    };

    const handleUpdateUser = (name, about) => {
        api
        .editProfile(name, about)
        .then((item) => {
            setcurrentUser(item);
            closeAllPopups();
        })
        .catch((err) => console.log(`???????????? ${err}`))
        .finally(() => {});
    };

    const handleUpdateAvatar = (avatar) => {
        api
        .updateAvatar(avatar.avatar)
        .then((item) => {
            setcurrentUser(item);
            closeAllPopups();
        })
        .catch((err) => console.log(`???????????? ${err}`))
        .finally(() => {});
    };

    const handleAddPlaceSubmit = (name, link) => {
        api
        .addCard(name, link)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => console.log(`???????????? ${err}`))
        .finally(() => {});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                />

                {/* ?????????? ???? '???????????????' */}
                <PopupWithForm
                    name="formDelete"
                    title="???? ???????????????"
                    id="popup__form popup__form_add"
                    formName="formDelete"
                    buttonText="????"
                    onClose={closeAllPopups}
                >
                    <input name="formDelete" className="popup__form popup__form_add" />
                </PopupWithForm>

                {/* ?????????? ???????????????? ???????????????? */}
                <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
