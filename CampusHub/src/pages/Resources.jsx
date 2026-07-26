import { useState } from 'react'
import useFetch from '../hooks/useFetch.js'
import ResourceList from '../components/ResourceList.jsx'

const emptyResource = {
  title: '',
  category: 'Documentation',
  url: '',
}

export default function Resources({ resources, onAddResource, onDeleteResource }) {
  const [formData, setFormData] = useState(emptyResource)
  const { data: posts, loading, error } = useFetch()

  function handleSubmit(event) {
    event.preventDefault()
    onAddResource({ id: Date.now(), ...formData })
    setFormData(emptyResource)
  }

  return (
    <section className="page-stack">
      <div className="panel">
        <p className="eyebrow">Resource Library</p>
        <h2>Save useful links</h2>
        <form className="form grid-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Resource title"
            value={formData.title}
            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Resource URL"
            value={formData.url}
            onChange={(event) => setFormData({ ...formData, url: event.target.value })}
            required
          />
          <select
            value={formData.category}
            onChange={(event) => setFormData({ ...formData, category: event.target.value })}
          >
            <option value="Documentation">Documentation</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Tool">Tool</option>
          </select>
          <button type="submit" className="primary-button">
            Add Resource
          </button>
        </form>
      </div>

      <ResourceList resources={resources} onDeleteResource={onDeleteResource} />

      <div className="panel">
        <p className="eyebrow">Posts</p>
        <h2>First 10 posts from JSONPlaceholder</h2>
        {loading ? <p>Loading posts...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
        <div className="post-list">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
