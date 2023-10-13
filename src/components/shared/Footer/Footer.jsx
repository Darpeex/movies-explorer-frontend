// Подвал сайта
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer footer_position section">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3>
      <hr className="footer__line" />
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy;&nbsp;2020&nbsp;</p>
        <ul className="footer__platforms-list">
          <li><a className="footer__platform" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
          <li><a className="footer__platform" href="https://github.com/">Github</a></li>
        </ul>
      </div>
    </footer>
  )
}
