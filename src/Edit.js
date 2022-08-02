import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams('id');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${id}`)
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
        setAuthor(data.author);
        setIsPending(false);
      });
  }, [id]);

  const currentData = {
    title,
    body,
    author,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentData),
    }).then((res) => {
      // console.log(res);
      if (res.ok) {
        console.log('Data updated');
        history.go(-1);
      }
    });
    setIsPending(true);
  };

  return (
    <div className="create">
      <h2>Edit a Blog</h2>
      {
        <form onSubmit={handleSubmit}>
          <label>Blog title: </label>
          <input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label>Blog body: </label>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
          ></textarea>
          <label>Blog author: </label>
          <select onChange={(event) => setAuthor(event.target.value)}>
            {/* <option value="mario">mario</option>
          <option value="yoshi">yoshi</option> */}
            <option value={author}>{author}</option>
          </select>
          {!isPending && <button type="submit">Save Changes</button>}
          {isPending && <button disabled>Saving changes...</button>}
        </form>
      }
      <p>{title}</p>
      <p>{author}</p>
      <p>{body}</p>
    </div>
  );
};

export default Edit;
