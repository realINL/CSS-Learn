import "./HomePage.css"
import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useProperties } from '../contexts/PropertiesContext';

function HomePage () {
	const navigate = useNavigate();
	const [query, setQuery] = useState<string>("");
	const { properties } = useProperties();

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return properties.filter(p => {
			const inTitle = p.title.toLowerCase().includes(q);
			const inTags = p.tags.some(t => t.toLowerCase().includes(q));
			const inName = p.name.toLowerCase().includes(q);
			const inDescription = p.description.toLowerCase().includes(q);
			return inTitle || inTags || inName || inDescription;
		});
	}, [properties, query]);

	const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter" && filtered.length > 0) {
			navigate(filtered[0].path);
		}
	};

	return (  
		<div className="home-page-container">
			<header className="home-page-header">
				<h1 className="css-learn-title">CSS Learn</h1>
				<h3>Интерактивный справочник с примерами кода и демонстрацией</h3>
				<div>
					<input 
						className="text-field-input"
						type="text"
						placeholder="Найти свойство..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={onKeyDown}
					/>
				</div>
				{filtered.length > 0 && (
					<div className="search-results">
						{filtered.slice(0, 8).map((item) => (
							<Link key={item.path} to={item.path} className="search-result-item">
								{item.title}
							</Link>
						))}
					</div>
				)}
			</header>
		  
			<main className="home-page">
				<img src="https://skillicons.dev/icons?i=css" alt="css logo" height={100}></img>
				<div>
					<h1 className="css-title">CSS</h1>
					<h4>Язык для стилизации веб-старниц</h4>
				</div>
			</main>

			<section className="section">
				<h3 className="home-page-h3">Изучай</h3>
				<h3 className="home-page-h3">Пробуй</h3>
			</section>

            <Link to="/color" className="start-learning-btn">
				🚀 Начать обучение
			</Link>
		</div>
	);
}

export default HomePage ;