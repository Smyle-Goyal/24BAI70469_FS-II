export default function ResourceCard({ resource, onDeleteResource }) {
  return (
    <article className="resource-card">
      <p className="eyebrow">{resource.category}</p>
      <h3>{resource.title}</h3>
      <a href={resource.url} target="_blank" rel="noreferrer">
        Open Resource
      </a>
      <button type="button" className="danger-button resource-delete" onClick={() => onDeleteResource(resource.id)}>
        Delete
      </button>
    </article>
  )
}
