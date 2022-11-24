import axios from "axios";
import React, { useEffect, useState } from "react";

const Axios = () => {
	const [posts, setPosts] = useState([]);
	const url = "https://jsonplaceholder.typicode.com/posts";
	useEffect(() => {
		const getPost = async () => {
			const { data: res } = await axios.get(url);
			setPosts(res);
		};
		getPost();
	}, []);

	const addPost = async () => {
		const post = { title: "New Post", body: "Posts" };
		await axios.post(url, post);
		setPosts([post, ...posts]);
	};

	const handleUpdate = async (post) => {
		post.title = "Updated Title";
		await axios.put(url + "/" + post.id);
		const postClone = [...posts];
		const index = postClone.indexOf(post);
		postClone[index] = { ...post };
		setPosts(postClone);
	};

	const handleDelete = async (post) => {
		await axios.delete(url + "/" + post.id + post);
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	return (
		<>
			<div className="container">
				<h2>There are {posts.length} post are in the database</h2>
				<button onClick={addPost} className="btn btn-primary">
					Add Post
				</button>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post) => {
							return (
								<tr key={post.id}>
									<td>{post.title}</td>
									<td>
										<button
											onClick={() => {
												handleUpdate(post);
											}}
											className="btn btn-info btn-sm"
										>
											Update
										</button>
									</td>
									<td>
										<button
											onClick={() => {
												handleDelete(post);
											}}
											className="btn btn-danger btn-sm"
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Axios;
