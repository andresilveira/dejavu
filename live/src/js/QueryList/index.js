var React = require('react');
var AddQuery = require('./AddQuery.js');
var DeleteQuery = require('./DeleteQuery.js');

// QueryList
class QueryList extends React.Component {
	getHistoricList = () => {
		var list = storageService.getItem('dejavuQueryList');
		if (list) {
			try {
				list = JSON.parse(list);
			} catch (e) {
				list = [];
			}
		} else {
			list = [];
		}
		return list;
	};

	setHistoricList = (list) => {
		var list = JSON.stringify(list);
		storageService.setItem('dejavuQueryList', list);
	};

	includeQuery = (queryEntry, index = null) => {
		let querylist = this.state.querylist;
		if (index !== null) {
			querylist = [...querylist.slice(0, index), queryEntry, ...querylist.slice(index + 1)];
		} else {
			querylist = [...querylist, queryEntry];
		}
		this.setHistoricList(querylist);
		this.setState({ querylist }, this.applyQuery.bind(this, queryEntry));
	};

	applyQuery = (queryEntry) => {
		if (this.props.externalQueryApplied) {
			if (this.state.selectedQuery.name !== queryEntry.name) {
				this.justApplyQuery(queryEntry);
			}
		} else {
			this.justApplyQuery(queryEntry);
		}
	};

	justApplyQuery = (queryEntry) => {
		this.setState({
			selectedQuery: queryEntry,
		});
		this.props.externalQuery(queryEntry);
	};

	applyDeleteQuery = (queryEntry) => {
		this.setState({
			selectedQuery: queryEntry,
			showDeleteQuery: true
		});
	};

	deleteQueryCb = (val) => {
		this.setState({
			showDeleteQuery: val
		});
	};

	deleteQuery = () => {
		var querylist = this.filterDeleteQuery(this.state.selectedQuery);
		this.setHistoricList(querylist);
		this.setState({
			querylist: querylist,
			showDeleteQuery: false
		});
	};

	filterDeleteQuery = (queryEntry) => {
		return this.state.querylist.filter((entry) => entry.name !== queryEntry.name);
	};

	clearQuery = () => {
		this.setState({
			selectedQuery: {
				'name': ''
			}
		});
		this.props.removeExternalQuery();
	};

	isChecked = (name) => {
		return this.props.externalQueryApplied && name === this.state.selectedQuery.name;
	};

	renderQueries = () => {
		return this.state.querylist.map(((queryEntry, index) => (
				<li key={index} className={"list-item col-xs-12 "+ (this.props.externalQueryApplied && queryEntry.name === this.state.selectedQuery.name ? 'active' : '')}>
					<div className="theme-element radio">
						<input
							id={"query-"+index}
							type="radio"
							checked={this.isChecked(queryEntry.name)}
							onChange={this.applyQuery.bind(this, queryEntry)}
							readOnly={false}
							/>
						<label htmlFor={"query-"+index}>
							<span className="col-xs-12 query-name">
								{queryEntry.name}
							</span>
						</label>
					</div>
					<a className="btn btn-grey delete-query" onClick={this.applyDeleteQuery.bind(this, queryEntry)}>
						<i className="fa fa-times"></i>
					</a>
					<AddQuery
						editable
						queryIndex={index}
						queryInfo={queryEntry}
						types={this.props.types}
						selectClass="applyQueryOn"
						includeQuery={this.includeQuery.bind(this)}
					/>
					<span className="pull-right createdAt">
						{moment(queryEntry.createdAt).format('Do MMM, h:mm a')}
					</span>
				</li>
		)).bind(this));
	};

	state = {
		querylist: this.getHistoricList(),
		querylistShow: false,
		showDeleteQuery: false,
		selectedQuery: {
			name: ''
		}
	};

	render() {
		return (
			<div className={"querylist-section"}>
				<DeleteQuery
					selectedQuery={this.state.selectedQuery}
					showModal={this.state.showDeleteQuery}
					deleteQuery={this.deleteQuery}
					deleteQueryCb={this.deleteQueryCb} />
				<ul className="theme-list col-xs-12">
					<li className="list-item col-xs-12">
						<AddQuery
							types={this.props.types}
							selectClass="applyQueryOn"
							includeQuery={this.includeQuery.bind(this)}
							queryInfo={{}} />
					</li>
					{this.renderQueries()}
				</ul>
			</div>
		);
	}
}

module.exports = QueryList;
