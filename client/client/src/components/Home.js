import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }



    componentDidMount() {
        this.retrievePosts();
    }





    //Retrieve the posts through the get request
    retrievePosts() {
        //backend server endpoint
        axios.get("http://localhost:8000/posts")
            .then(res => {
                if (res.data.success) {
                    this.setState({ posts: res.data.existingPosts });
                    console.log(this.state.posts);
                }



            });
    }


    render() {
        return (
            <div className="container">
                <p>All Posts</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Topic</th>
                            <th scope="col">Description</th>
                            <th scope="col">Post Category</th>
                            <th scope="col">Action</th>

                        </tr>

                    </thead>
                    <tbody>
                        {this.state.posts.map((posts, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <a href={`/post/${posts._id}`} style={{ textDecoration: 'none' }}> </a>


                                    {posts.topic}


                                </td>
                                <td>{posts.description}</td>
                                <td>{posts.postCategory}</td>
                                <td>
                                    <a className="btn btn-warning" href="#">
                    //space without going to new line nbsp
                                        <i className="fas fa-edit"></i>&nbsp;Edit
                                    </a>
                                    &nbsp;
                                    <a className="btn btn-danger" href="#">
                    //space without going to new line nbsp
                                        <i className="far fa-trash"></i>&nbsp;Delete
                                    </a>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                <button className="btn btn-success"><a href="/add" style={{ textDecoration: 'none', color: 'white' }}>Create New Post</a></button>


            </div>
        )
    }
}