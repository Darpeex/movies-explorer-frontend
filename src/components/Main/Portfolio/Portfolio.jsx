// Портфолио
import './Portfolio.css';
import diagonalArrow from '../../../images/diagonal-arrow.svg'

const portfolioWorks = [
  { num: 1, url: "https://darpeex.github.io/how-to-learn/", name: 'Статичный сайт' },
  { num: 2, url: "https://darpeex.github.io/russian-travel/", name: 'Адаптивный сайт' },
  { num: 3, url: "https://github.com/Darpeex/react-mesto-api-full-gha", name: 'Одностраничное приложение' },
];

function PortfolioItem({ url, name, isLast }) {
  return (
    <li className="portfolio__works-item">
      <a className="portfolio__works-element" href={url} target="_blank" rel="noopener noreferrer">
        <p className="portfolio__site">{name}</p>
        <img className="portfolio__arrow" src={diagonalArrow} alt="ссылка на проект" />
      </a>
      {!isLast && <hr className="portfolio__line" />}
    </li>
  )
}

export function Portfolio() {
  return (	// Секция Portfolio
    <section className="portfolio portfolio_position section">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__works">
        <ul className="portfolio__works-list">
          {portfolioWorks.map((work, i) => // i - текущий индекс в цикле (0, 1, 2)
            <PortfolioItem
              key={work.num}
              url={work.url}
              name={work.name}
              isLast={i === portfolioWorks.length - 1} // (portfolioWorks.length - 1) - последний элемент массива (3 - 1 = 2)
            />)}
        </ul>
      </div>
    </section>
  )
}
