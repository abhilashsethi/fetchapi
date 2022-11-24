import React, { useEffect, useState } from "react";

const Fetch = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const url = "https://jsonplaceholder.typicode.com/comments";
		const fetchData = async () => {
			try {
				const res = await fetch(url);
				const json = await res.json();
				setData(json);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const postCall = async () => {
		const details = {
			title: "My post title",
			body: "My post content.",
		};
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/posts",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(details),
				}
			);
			const data = await response.json();
			// enter you logic when the fetch is successful
			if (response.ok) {
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	postCall();
	return (
		<div className="App">
			<h2>Welcome</h2>
			{data.map((item, index) => {
				return <div key={index}>{item.name}</div>;
			})}
		</div>
	);
};

export default Fetch;
