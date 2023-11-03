// Страница с ошибками
import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';

export function ErrorPage({ error }) {
	const navigate = useNavigate();
	const errorType = 404; // error.statusCode;

	function errorTypeText() {
		if (errorType === 404) {
			return "Страница по указанному маршруту не найдена.";
		} else if (errorType === 500) {
			return "На сервере произошла ошибка.";
		}
	}

	return ( // Секция error-page
		<main>
			<section className="error-page">
				<div className="error-page__container">
					<h1 className="error-page__title">{errorType}</h1>
					<p className="error-page__description">{errorTypeText()}</p>
					<button className="error-page__navigate" type="button" onClick={() => navigate(-1)}>Назад</button>
				</div>
			</section>
		</main>
	)
}
