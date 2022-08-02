import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from './useFetch';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Dina');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const {
    data: authors,
    isPendings,
    error,
  } = useFetch('http://localhost:8000/authors');

  const handleSubmit = (event) => {
    event.preventDefault();

    const blog = {
      title,
      body,
      author,
    };

    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log('New blog added');
      setIsPending(false);
      history.push('/');
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
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
          {authors &&
            authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
        </select>
        {!isPending && <button type="submit">Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
      <p>{title}</p>
      <p>{author}</p>
      <p>{body}</p>
    </div>
  );
};

export default Create;
