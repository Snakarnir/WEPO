import React from 'react';
import ListView from '../ListView/ListView';
import ListViewItem from '../ListViewItem/ListViewItem';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import newsService from '../../services/newsService';
import { connect } from 'react-redux';
import { getUserSession } from '../../actions/actions.js';
import { Alert } from 'al-infinitymodules';

class News extends React.Component {
    componentDidMount() {
        newsService.getNews().then((news) => { this.setState({ news }); });
        const { getUserSession } = this.props;
        getUserSession();
    }
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            categoryFilter: 'technology',
            news: []
        };
    };
    onFilter(e) {
        this.setState({
            filter: e.target.value
        });
    }
    render() {
        const { news, filter, categoryFilter } = this.state;
        const filteredNews = news.filter(n => n.title.toLowerCase().includes(filter.toLowerCase()) && n.category === categoryFilter);
        return (
            <div>
                <Alert type="info">
                    <Alert.Title>Info!</Alert.Title>
                    <Alert.Text>You can search with the search bar</Alert.Text>
                </Alert>
                <SearchBar onFilter={this.onFilter.bind(this)} />
                <Filter onFilter={(category) => { this.setState({ categoryFilter: category }) }} selected={categoryFilter} />
                <ListView>
                    {filteredNews.map((newsItem) => (<ListViewItem key={newsItem.id} info={newsItem} />))}
                </ListView>
            </div>
        );
    };
};

export default connect(null, { getUserSession })(News);
