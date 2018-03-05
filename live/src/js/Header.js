var React = require('react');

class Header extends React.Component {
	render() {
		return (
			<header className="header text-center">
				<div className="img-container">
					<span className="header-img-container">
						<img src="assets/img/favicon.png" alt="Gem" className="img-responsive"/>
						<span className="dejavu-title">
							<strong>LAB</strong>RECRUIT
						</span>
					</span>
				</div>
			</header>
		);
	}
}

module.exports = Header;
