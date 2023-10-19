// Использованные технологии
import './Techs.css';

export function Techs() {
  return (	// Секция Techs
    <section className="techs techs_position section">
      <h2 className="techs__title">Технологии</h2>
      <hr className="techs__line" />
      <h3 className="techs__title-technologies">7&nbsp;технологий</h3>
      <p className="techs__description">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в дипломном&nbsp;проекте.</p>
      <ul className="techs__grid">
        <li className="techs__grid-element">HTML</li>
        <li className="techs__grid-element">CSS</li>
        <li className="techs__grid-element">JS</li>
        <li className="techs__grid-element">React</li>
        <li className="techs__grid-element">Git</li>
        <li className="techs__grid-element">Express.js</li>
        <li className="techs__grid-element">mongoDB</li>
      </ul>
    </section>
  )
}
