import { useState } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
  const [name, setName] = useState('Dina');
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch('http://localhost:8000/blogs');
  // const handleDelete = (id) => {
  //   const newBlog = blogs.filter((blog) => blog.id !== id);
  //   setBlogs(newBlog);
  // };
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="Blog List" />}
      {/* <button onClick={() => setName('Rifa')}>Change name</button>
      <p>{name}</p> */}
      {/* <BlogList
        blogs={blogs.filter((blog) => blog.author === 'Dina')}
        title="Dina's Blogs"
      /> */}
    </div>
  );
};

export default Home;
