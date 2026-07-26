export default function taskReducer(tasks, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...tasks, action.payload]

    case 'DELETE_TASK':
      return tasks.filter((task) => task.id !== action.payload)

    case 'UPDATE_TASK':
      return tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task,
      )

    case 'TOGGLE_TASK':
      return tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      )

    default:
      return tasks
  }
}
