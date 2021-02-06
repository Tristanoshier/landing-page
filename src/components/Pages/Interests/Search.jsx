import { useState, useEffect } from 'react';
import { Input, Form } from 'reactstrap';
import convertDate from '../../Shared/DateConverter';

export const Search = (props) => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [topic, setTopic] = useState('');

    const handleSubmit = (e) => e.preventDefault();

    useEffect(() => {
        const filterSearch = () => {
            if (topic === 'music') {
                setFilteredPosts(props.musicPosts);
            } else if (topic === 'movies') {
                setFilteredPosts(props.moviePosts);
            } else if (topic === 'programming') {
                setFilteredPosts(props.programmingPosts);
            } else if (topic === '') {
                setFilteredPosts(props.posts);
            }

            let filtered;
            if (topic === 'music') {
                filtered = props.musicPosts.filter(post => {
                    if (searchTerm === '') {
                        return props.musicPosts;
                    } else if (post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
                        return post;
                    } return null;
                })
            } else if (topic === 'movies') {
                filtered = props.moviePosts.filter(post => {
                    if (searchTerm === '') {
                        return props.moviePosts;
                    } else if (post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
                        return post;
                    } return null;
                })
            } else if (topic === 'programming') {
                filtered = props.programmingPosts.filter(post => {
                    if (searchTerm === '') {
                        return props.programmingPosts;
                    } else if (post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
                        return post;
                    } return null;
                })
            } else if (topic === '') {
                filtered = props.posts.filter(post => {
                    if (searchTerm === '') {
                        return props.posts;
                    } else if (post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
                        return post;
                    } return null;
                })
            }
            setFilteredPosts(filtered);
        }
        filterSearch();
    }, [topic, searchTerm, props.musicPosts, props.moviePosts, props.posts, props.programmingPosts])

    const postMapper = () => {
        if (filteredPosts.length > 0) {
            return filteredPosts.map((post, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="interest-card-header">
                            <span className="top-row">
                                <p className="card-title">{post.title}</p>
                                <p className="card-date">{convertDate(post.createdAt)}</p>
                            </span>
                            <span className="card-topic">{post.topic}</span>
                        </div>

                        <div className="card-body">
                            {post.body}
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <h2 className={props.darkMode ? "about-text-dark" : "about-text-light"}>
                    no results found
                </h2>
            )

        }
    }

    const chooseTopic = (e) => {
        setTopic(e.target.value);
    }

    const userSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div>
            <Form className="search-form" onSubmit={handleSubmit}>
                <Input className="topic-filter" type='select' name="topic" value={topic} onChange={(e) => chooseTopic(e)} >
                    <option value="">All</option>
                    <option value="programming">Programming</option>
                    <option value="music">Music</option>
                    <option value="movies">Movies</option>
                </Input>
                <input className="searchbar" onChange={(e) => userSearch(e)} id="search" type="text" placeholder="Search..." />
            </Form>
            {postMapper()}
        </div>
    )
}
