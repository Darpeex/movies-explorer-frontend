// Описание дипломного проекта
import './AboutProject.css';

export function AboutProject({scrollToRef}) {
	return (	// Секция AboutProject
		<section className="about-project about-project_position section" ref={scrollToRef}>
			<h2 className="about-project__title">О проекте</h2>
			<div className="about-project__line line"></div>
			<div className="about-project__description">
				<h3 className="about-project__definition about-project__definition_title">Дипломный проект включал 5 этапов</h3>
				<h3 className="about-project__definition about-project__definition_title">На&nbsp;выполнение диплома ушло 5 недель</h3>
				<p className="about-project__definition about-project__definition_info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
				<p className="about-project__definition about-project__definition_info">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
			</div>
			<div className="about-project__table-grid">
				<p className="about-project__timeline about-project__timeline_green">1 неделя</p>
				<p className="about-project__timeline about-project__timeline_gray">4 недели</p>
				<p className="about-project__direction about-project__direction_backend">Back-end</p>
				<p className="about-project__direction about-project__direction_frontend">Front-end</p>
			</div>
		</section>
	)
}
