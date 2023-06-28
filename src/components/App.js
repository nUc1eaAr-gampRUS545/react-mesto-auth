import React from "react";
import api from "../utils/api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import Registr from "./Registr.js";
import Login from "./Login.js";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { registr, authorization, getContent } from "../utils/UserAuth.js";
import { NavLink } from "react-router-dom";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const navigate = useNavigate();
  function handleErrorMassege() {
    setErrorMassege(true);
  }
  function handleOKMassege() {
    setErrorMassege(false);
  }
  function signOut() {
    localStorage.removeItem("jwt");
  }
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");

    getContent(jwt)
      .then((data) => {
        if (!data) {
          return;
        }
        navigate("/");
        setLoggedIn(true);
        setUserData(data);
      })
      .catch((data) => {
        console.error(data);
        setLoggedIn(false);
      });
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  const handleLogged = () => {
    setLoggedIn(true);
  };
  const [errorMassege, setErrorMassege] = React.useState(null);
  const [isUserData, setUserData] = React.useState({});
  let object = isUserData;
  const [cards, setCards] = React.useState([]);
  const [isLoggetIn, setLoggedIn] = React.useState(null);
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .setLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const handleEditDeleteCardClick = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    api
      .getInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, {});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditInfoTooltipPopupOpen, setIsEditInfoTooltipPopupOpen] =
    React.useState(false);
  const [isEditDeleteCardPopupOpen, setIsEditDeleteCardPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleEditInfoTootipClick = () => {
    setIsEditInfoTooltipPopupOpen(true);
  };
  const closeAllPopups = () => {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditDeleteCardPopupOpen(false);
    setIsEditInfoTooltipPopupOpen(false);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  function handleUpdateUser(i) {
    api
      .replaceInfo(i)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleUpdateAvatar(i) {
    api
      .changeProfile(i)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleAddPlaceSubmit(newCard) {
    api
      .addMyCards(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleDeleteCard(data) {
    api
      .deleteCard(data)
      .then((items) => {
        setCards([items, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="sign-up"
          element={
            <>
              <Header
                element={
                  <NavLink className="header__link" to="/sign-in">
                    Войти
                  </NavLink>
                }
                flag={true}
                userData={isUserData}
              />
              <Registr
                registr={registr}
                handleEditInfoTootipClick={handleEditInfoTootipClick}
                handleErrorMassege={handleErrorMassege}
                handleOKMassege={handleOKMassege}
              />
            </>
          }
        />

        <Route
          path="sign-in"
          element={
            <>
              <Header
                element={
                  <NavLink className="header__link" to="/sign-up">
                    Регистрация
                  </NavLink>
                }
                flag={true}
                userData={isUserData}
              />
              <Login
                authorization={authorization}
                handleLogged={handleLogged}
                handleEditInfoTootipClick={handleEditInfoTootipClick}
                handleErrorMassege={handleErrorMassege}
              />
            </>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggetIn}
              element={
                <>
                  <CurrentUserContext.Provider value={currentUser}>
                    <Header
                      element={
                        <NavLink
                          className="header__link"
                          onClick={signOut}
                          to="/sign-in"
                        >
                          Выйти
                        </NavLink>
                      }
                      flag={false}
                      userData={object.data}
                    />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onDeleteCard={handleEditDeleteCardClick}
                      cards={cards}
                    />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                    <Footer />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddPlaceSubmit={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                    <DeleteCardPopup
                      isOpen={isEditDeleteCardPopupOpen}
                      onClose={closeAllPopups}
                      onDeleteCard={handleDeleteCard}
                    />
                  </CurrentUserContext.Provider>
                </>
              }
            />
          }
        />
      </Routes>
      <InfoTooltip
        isOpen={isEditInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        errorMassege={errorMassege}
      ></InfoTooltip>
    </div>
  );
}

export default App;
