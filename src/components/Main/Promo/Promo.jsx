// Баннер страницы «О проекте»
import './Promo.css';

export function Promo({scrollToRef}) {
	return ( // Секция Promo
		<section className="promo promo_position section">
			<div className="promo__description">
				<h1>Учебный проект студента факультета Веб&#8209;разработки.</h1>
				<p>Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
				<button className="promo__navigate" onClick={() => scrollToRef.current.scrollIntoView({ behavior: 'smooth' })}>Узнать больше</button>
			</div>
			<div className="promo__image"></div>
		</section>
	)
}
