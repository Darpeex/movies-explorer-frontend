// Попап редактирования профиля
import React from "react";
import { PopupWithForm } from "./PopupWithForm"
import { CurrentUserContext } from "../context/CurrentUserContext"

export const EditProfilePopup = ({ onUpdateUser, isOpen, onClose }) => { // Передаётся текущее значение свойств onUpdateUser, isOpen и onClose
  const currentUser = React.useContext(CurrentUserContext); // Подписка на контекст пользователя
  const [name, setName] = React.useState(''); // Состояние имени
  const [description, setDescription] = React.useState(''); // Состояние описания

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name ?? ''); // Если имя не успело прийти с сервера - поле пустое
    setDescription(currentUser.about ?? ''); // Если описание не успело прийти с сервера - поле пустое
  }, [currentUser, isOpen]);  // При изменении контекста пользователя и, если попап меняет своё состояние открытости - состояние имени и описания меняется

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы
    onUpdateUser({ name, description }); // Передаём значения управляемых компонентов во внешний обработчик
  }
  function handleNameChange(e) { // Следим за изменениями в поле name и подставляем в стейт
    setName(e.target.value);
  }
  function handleDescriptionChange(e) { // Следим за изменениями в поле description и подставляем в стейт
    setDescription(e.target.value);
  }

  return ( // В строке ниже передаём значения пропсов попапа в общую структуру/компонент попапа PopupWithForm
    <PopupWithForm id="editProfile" formId="editProfileForm" title="Редактировать профиль" name="editForm" text="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        name="name"
        value={name} // значение поля из стейта
        onChange={handleNameChange} // При изменении вызывается функция, которая изменяет введенное значение в поле
        id="user-name"
        className="popup__form-input popup__form-input_field_name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required />
      <span id="user-name-error" className="popup__form-input-error"></span>
      <input
        name="about"
        value={description} // значение поля из стейта
        onChange={handleDescriptionChange} // Срабатывает каждый раз, когда в поле ввода вносятся изменения
        id="about"
        className="popup__form-input popup__form-input_field_activity"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required />
      <span id="about-error" className="popup__form-input-error"></span>
    </PopupWithForm>
  )
}