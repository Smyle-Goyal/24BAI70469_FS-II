export const initialTasks = [
  {
    id: 1,
    title: 'Submit React assignment',
    description: 'Complete the CampusHub dashboard and push the changes.',
    priority: 'High',
    completed: false,
    deadline: '2026-07-28',
  },
  {
    id: 2,
    title: 'Revise hooks chapter',
    description: 'Review custom hooks and reducer patterns for the exam.',
    priority: 'Medium',
    completed: true,
    deadline: '2026-07-26',
  },
  {
    id: 3,
    title: 'Bookmark learning resources',
    description: 'Save useful React and JavaScript references.',
    priority: 'Low',
    completed: false,
    deadline: '2026-07-30',
  },
]

export const initialResources = [
  {
    id: 1,
    title: 'React Docs',
    category: 'Documentation',
    url: 'https://react.dev',
  },
  {
    id: 2,
    title: 'MDN Web Docs',
    category: 'Documentation',
    url: 'https://developer.mozilla.org',
  },
  {
    id: 3,
    title: 'JavaScript Info',
    category: 'Tutorial',
    url: 'https://javascript.info',
  },
]

export const demoUser = {
  name: 'Akash',
}

export async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')

  if (!response.ok) {
    throw new Error('Failed to load posts.')
  }

  return response.json()
}
