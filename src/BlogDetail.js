import { useHistory, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetail = () => {
  const { id } = useParams();
  const url = `http://localhost:8000/blogs/${id}`;
  const { data: blog, isPending, error } = useFetch(url);
  const history = useHistory();

  const handleDelete = () => {
    fetch(url, {
      method: 'DELETE',
    }).then(() => {
      history.push('/');
    });
  };

  const handleEdit = () => {
    history.push(`/blog/edit/${blog.id}`);
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>delete</button>
          <button onClick={handleEdit}>edit</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetail;
