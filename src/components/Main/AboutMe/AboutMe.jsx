// Информация о студенте
import './AboutMe.css';
import studentImage from '../../../images/stich.png';

export function AboutMe() {
  return (	// Секция AboutMe
    <section className="about-me about-me_position section">
      <h2 className="about-me__title">Студент</h2>
      <hr className="about-me__line" />
      <div className="about-me__wrapper">
        <img className="about-me__image" src={studentImage} alt="Фото студента" />
        <h3 className="about-me__title-name">Сергей</h3>
        <p className="about-me__briefly-description">Фронтенд-разработчик, 20&nbsp;лет</p>
        <p className="about-me__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Сарове, учусь на&nbsp;факультете ИТЭ. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь спортом. Недавно начал изучать программирование. Сейчас прохожу курс по&nbsp;Веб-разработке, получая знания и&nbsp;навыки, которые мне могут пригодиться в&nbsp;будущем.</p>
        <a className="about-me__github" href="https://github.com/Darpeex" target="_blank" rel="noopener noreferrer">Github</a>
      </div>
    </section>
  )
}
