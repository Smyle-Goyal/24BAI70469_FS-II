import { useMemo, useState } from 'react'
import ResourceCard from './ResourceCard.jsx'

export default function ResourceList({ resources, onDeleteResource, showControls = true }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const visibleResources = useMemo(() => {
    const loweredSearch = searchTerm.toLowerCase()

    return resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(loweredSearch) ||
        resource.url.toLowerCase().includes(loweredSearch)
      const matchesCategory = categoryFilter === 'all' ? true : resource.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [categoryFilter, resources, searchTerm])

  const categories = [...new Set(resources.map((resource) => resource.category))]

  return (
    <section className="resource-section">
      {showControls ? (
        <div className="controls">
          <input
            type="search"
            placeholder="Search resources"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="resource-grid">
        {visibleResources.length > 0 ? (
          visibleResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onDeleteResource={onDeleteResource}
            />
          ))
        ) : (
          <p className="empty-state">No resources found.</p>
        )}
      </div>
    </section>
  )
}
