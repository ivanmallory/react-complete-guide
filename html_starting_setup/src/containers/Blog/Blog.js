import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';


class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }
    componentDidMount (){
        axios.get('/posts') //Can't store as a variable because it is always updating
            .then(response => {
                const posts = response.data.slice(0,4); //Stores only the data posts from 1-4, preventing them from all appearing on the screen
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPosts}); //Takes data retrieved from server and updates it to the current state
                //console.log(response);
            });
    }
    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        })
    }
    render () {
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>;
        if(!this.state.error){ //Overrides posts if there isn't an error
            posts = this.state.posts.map(post => {
                return <Post key={post.id} title={post.title} author={post.author} clicked={() => this.postSelectedHandler(post.id)}/>
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;