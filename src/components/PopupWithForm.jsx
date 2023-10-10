// Общий компонент попапов
export function PopupWithForm(props) {
  // Отмена стандартного действия, чтобы страница не перезагружалась после submit'a
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(evt); // Я так понимаю, далее мы передаём функционал в ручки дочерних попапов, как там описано
  };

  // Проверка целевого элемента. Если целевой элемент события является самим оверлеем попапа (event.target === event.currentTarget), то вызывается функция props.onClose, закрывающая попап.
  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  }

  return ( // Условие попапа | isOpen ? "popup_opened" : "" | значит - если isOpen = true, попапу добавляется класс popup_opened (он открывается), иначе ничего не добавляем
    <div id={props.id} className={`popup ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={handleOverlayMouseDown}> {/* Производит закрытие попапа по клику на оверлей */}
      <div className={`popup__container popup__container_${props.class}`} onClick={(e) => e.stopPropagation()} > {/* .stopPropagation() - препятствует продвижению события дальше и позволяет избежать закрытия при клике на его содержимое */}
        <h2 className="popup__title">{props.title}</h2>
        <button className="popup__button popup__button_action_close" type="button" onClick={props.onClose} aria-label="Закрыть"></button>
        {props.children && <form id={`popup__${props.formId}`} className={`popup__form popup__${props.name}`} name={`${props.name}`} onSubmit={handleSubmit}>
          {props.children}
          <button className="button popup__button popup__button_action_save popup__button_valid" type="submit">{props.text}</button>
        </form>}
      </div>
    </div>
  )
}

// Лучше деструктурировать пропсы, чтобы не дублировать везде props. в коде: 
// function PopupWithForm({isOpen, onClose, name, title, buttonText, children}) { 
// Если будет интересно, можно добавить универсальную обертку Popup для любых попапов, в которой будет обработка оверлея, крестика и Escape.
// import { useEffect } from "react";
// // создаем отдельный компонент `Popup` для обертки любых попапов
// const Popup = ({ isOpen, name, onClose, children }) => {
// // внутри указываем `useEffect` для обработчика `Escape`
//   useEffect(() => {
//     // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
//     if (!isOpen) return;
// // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
//     const closeByEscape = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     }
//     document.addEventListener('keydown', closeByEscape)
//     // обязательно удаляем обработчик в `clean-up` функции
//     return () => document.removeEventListener('keydown', closeByEscape)
// // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
// }, [isOpen, onClose])

// // создаем обработчик оверлея
//   const handleOverlay = (e) => {
//     if (e.target === e.currentTarget) {
//         onClose();
//     }
//   }
// // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`. 
//   return (
//     <div
//       className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
//       // добавляем обработчик оверлея
//       onClick={handleOverlay}
//     >
//     {/* добавляем контейнер для контента попапа с возможностью изменения типа, чтобы ImagePopup можно было сделать с другими размерами */}
//       <div className={`popup__container popup__container_type_${name}`}>
//         {/* тут может быть любой контент попапа в `children`: хоть для попапа картинки, хоть для `InfoToolTip`, 
//         хоть для `PopupWithForm` */}
//         {children}
//         {/* кнопка крестика есть у любого попапа */}
//         <button
//           className='popup__close'
//           type='button'
//           onClick={onClose}
//         />
//       </div>
//     </div>
//   );
// };
// export default Popup;
  
// И теперь можно использовать в любом компоненте, который является попапом: в  ImagePopup,  InfoTooltip и  PopupWithForm.
// function PopupWithForm({isOpen, name, onClose, ...props}) {
//   return (
//     <Popup isOpen={isOpen} name={name} onClose={onClose}>
//         <h2 className='popup__title'>{props.title}</h2>
// И теперь Вам не нужно дублировать верстку обертки попапа, навешивать обработчики оверлея, крестиков и Escape где-то еще. Все будет в одном компоненте Popup. Кстати, можете попробовать сделать компонент Form для любых форм, а так же Input для инпутов.