// Описание дипломного проекта
import './AboutProject.css';

export function AboutProject() {
	return (	// Секция AboutProject
		<section className="about-project about-project_position section">
			<h2 className="about-project__title">О проекте</h2>
			<hr className="about-project__line" />
			<div className="about-project__description">
				<h3>Дипломный проект включал 5&nbsp;этапов</h3>
				<h3>На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
				<p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
				<p>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
			</div>
			<div className="about-project__table-grid">
				<div className="about-project__timeline about-project__timeline_green">1 неделя</div>
				<div className="about-project__timeline about-project__timeline_gray">4 недели</div>
				<p className="about-project__direction about-project__direction_backend">Back-end</p>
				<p className="about-project__direction about-project__direction_frontend">Front-end</p>
			</div>
		</section>
	)
}
