// Баннер страницы «О проекте»
import './Promo.css';
import promoImage from '../../../images/promoImage.svg'

export function Promo({ scrollToRef }) {
	return ( // Секция Promo
		<section className="promo promo_position section">
			<img className="promo__image" src={promoImage} alt="Промо картинка"></img>
			<div className="promo__description">
				<h1 className="promo__description-title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
				<p className="promo__description-paragraph">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
				<button type="button" className="promo__navigate" onClick={() => scrollToRef.current.scrollIntoView({ behavior: 'smooth' })}>Узнать больше</button>
			</div>
		</section>
	)
}
