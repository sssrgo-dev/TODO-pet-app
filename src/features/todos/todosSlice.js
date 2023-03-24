const createdTime = new Date(Date.now()).toLocaleDateString()

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa officia ab, sed quo adipisci nihil quod autem natus! Accusamus odit maxime, dignissimos possimus quaerat dolorem mollitia placeat praesentium unde molestias."

const initialState = {
  1: {
    id: 1,
    name: "Todo1",
    createdTime: createdTime,
    status: "queue",
    description: description,
  },
  2: {
    id: 2,
    name: "Todo2",
    createdTime: createdTime,
    status: "queue",
    description: description,
  },
  3: {
    id: 3,
    name: "Todo3",
    createdTime: createdTime,
    status: "queue",
    description: description,
  },
  4: {
    id: 4,
    name: "Todo4",
    createdTime: createdTime,
    status: "development",
    description: description,
  },
  5: {
    id: 5,
    name: "Todo5",
    createdTime: createdTime,
    status: "done",
    description: description,
  },
}
export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "todos/todoAdded": {
      console.log("todo Added")
      return { ...state }
    }
    case "todos/todoDeleted": {
    }
    case "todos/todoStatusChanged": {
    }
    case "todos/todoUpdated": {
      const todoToUpdate = action.payload
      const { id } = todoToUpdate
      console.log("todo updating", todoToUpdate)
      return { ...state, [id]: todoToUpdate }
    }

    default:
      return { ...state }
  }
}

export const allTodosInState = (state) => state.todos
