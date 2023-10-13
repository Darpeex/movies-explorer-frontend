// Баннер страницы «О проекте»
import './Promo.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/constants';

export function Promo() {
	return ( // Секция Promo
		<section className="promo promo_position section">
			<div className="promo__description">
				<h1>Учебный проект студента факультета Веб&#8209;разработки.</h1>
				<p>Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
				<Link className="promo__navigate" to={ROUTES.HOME}>Узнать больше</Link>
			</div>
			<div className="promo__image"></div>
		</section>
	)
}
