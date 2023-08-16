import { useState } from 'react';
import useSWR from 'swr';

interface Post {
	id: number;
	title: string;
	body: string;
}

const fetcher = async (url: string) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const Home = () => {
	const { data: posts, error } = useSWR<Post[]>('https://jsonplaceholder.typicode.com/photos', fetcher);
	const [visiblePosts, setVisiblePosts] = useState(8);

	if (error) return <div>Error fetching data</div>;
	if (!posts) return <div>Loading...</div>;

	const loadMore = () => {
		setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 8);
	};

	// function dynamicImg(link: any) {
	// 	link += Math.floor(Math.random() * 500) + 200;
	// 	console.log(link);

	// 	return link
	// }


	return (
		<div className='bg-white text-black relative'>
			<h1 className='text-center text-4xl font-extrabold py-20'>Photos</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-16 md:px-32 max-w-lg md:max-w-none mx-auto">
				{posts.slice(0, visiblePosts).map(post => (
					<a href={'https://i.pravatar.cc/350?u=' + post.id} target='_blank' key={post.id} className="card-item shadow-lg rounded-2xl hover:shadow-xl transition duration-200 overflow-hidden z-40">
						{/* <img src={dynamicImg('https://i.pravatar.cc/')} className='w-full' alt="" /> */}
						{/* <img src={'https://i.pravatar.cc/' + Math.floor(Math.random() * 500) + 300} className='w-full' alt="" /> */}
						<img src={'https://i.pravatar.cc/350?u=' + post.id} className='w-full' alt="" />

						<div className="p-5">
							<h1 className="font-[600] text-[20px] mb-3">
								{post.title}
							</h1>
							<p className="font-[500] text-[16px] text-[#374151] mb-3">
								{post.body}
							</p>
							<p className="font-[500] text-[16px] text-[#71717A]">
								25 Maret 2023
							</p>
						</div>
					</a>
				))}
			</div>
			<div className="w-full mx-auto">
				<button onClick={loadMore} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-52 m-10 ml-32">
					Load More
				</button>
			</div>
		</div>
	);
};

export default Home;
