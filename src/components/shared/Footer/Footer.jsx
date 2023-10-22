// Подвал сайта
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer footer_position section">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3>
      <div className="footer__line line"></div>
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy;&nbsp;2020&nbsp;</p>
        <ul className="footer__platforms-list">
          <li className="footer__platforms-item"><a className="footer__platform" href="https://practicum.yandex.ru/" target='_blank' rel="noopener noreferrer">Яндекс.Практикум</a></li>
          <li className="footer__platforms-item"><a className="footer__platform" href="https://github.com/" target='_blank' rel="noopener noreferrer">Github</a></li>
        </ul>
      </div>
    </footer>
  )
}
