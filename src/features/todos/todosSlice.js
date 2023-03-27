import {
  filter,
  indexOf,
  keys,
  last,
  map,
  max,
  min,
  move,
  reduce,
  remove,
  values,
  __,
} from "ramda"

const createdTime = new Date(Date.now()).toLocaleDateString()

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa officia ab, sed quo adipisci nihil quod autem natus! Accusamus odit maxime, dignissimos possimus quaerat dolorem mollitia placeat praesentium unde molestias."

const initialState = {
  todos: {
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
    6: {
      id: 6,
      name: "Todo6",
      createdTime: createdTime,
      status: "development",
      description: description,
    },
    7: {
      id: 7,
      name: "Todo7",
      createdTime: createdTime,
      status: "done",
      description: description,
    },
  },
  sortedByUser: [7, 2, 3, 4, 5, 6, 1],
}
export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "todos/todoAdded": {
      console.log("todo Added", action.payload)
      const { status, sorting } = action.payload

      const id = Math.max(...Object.keys(state.todos)) + 1
      console.log("new id", id)

      return {
        ...state,
        sortedByUser:
          sorting === "upper"
            ? [id, ...state.sortedByUser]
            : [...state.sortedByUser, id],
        todos: {
          ...state.todos,
          [id]: { id, name: "", description: "", status },
        },
      }
    }

    case "todos/todoDeleted": {
      console.log("todo deleted")
      const { id } = action.payload

      const currTodos = { ...state.todos }
      delete currTodos[id]

      const currSortedByUser = [...state.sortedByUser]
      const positionToDelete = indexOf(id, currSortedByUser)
      const updatedSortedByUser = remove(positionToDelete, 1, currSortedByUser)

      return {
        ...state,
        todos: currTodos,
        sortedByUser: updatedSortedByUser,
      }
    }

    case "todos/todoUpdated": {
      const { name, id } = action.payload

      return {
        ...state,
        todos: { ...state.todos, [id]: { ...state.todos[id], name } },
      }
    }

    case "todos/todosMoved": {
      const { activeId, overId, y } = action.payload
      const todos = { ...state.todos }
      var sortedByUser = [...state.sortedByUser] // sort can be changed
      const indexInSortedByUserOf = indexOf(__, sortedByUser)
      const todoToUpdate = { ...state.todos[activeId] }

      const activeContainerName = todos[activeId].status
      const overContainerName = todos[overId]?.status || overId

      const isFromSameContainer = activeContainerName === overContainerName

      const activeIdIndex = indexInSortedByUserOf(activeId)
      const moveActiveIndexInSortedByUserTo = move(
        activeIdIndex,
        __,
        sortedByUser
      )

      if (!isFromSameContainer) {
        todoToUpdate.status = overContainerName // different containers, change status
      }

      if (overId !== overContainerName) {
        let overIdIndex = indexInSortedByUserOf(overId)

        if (!isFromSameContainer) {
          overIdIndex =
            activeIdIndex < overIdIndex ? overIdIndex - 1 : overIdIndex
        }
        // console.log("start")
        // console.log("sortedByUser", sortedByUser)
        sortedByUser = moveActiveIndexInSortedByUserTo(overIdIndex)
        // console.log(" end sortedByUser", sortedByUser)
      }

      if (overId === overContainerName) {
        const todosOfOverStatus = filter(
          (todo) => todo.status === overContainerName,
          values(state.todos)
        )
        const todosIdsOfStatusToCompare = filter(
          (id) => map((todo) => todo.id, todosOfOverStatus).includes(id),
          sortedByUser
        )

        let overIdIndex =
          y > 0
            ? indexInSortedByUserOf(last(todosIdsOfStatusToCompare))
            : indexInSortedByUserOf(todosIdsOfStatusToCompare[0])
        // indexInSortedByUserOf could be -1 (if no elements in todosIdsOfStatusToCompare)

        if (overIdIndex < 0) {
          overIdIndex = activeIdIndex // sorting position does not change by drop in empty column
        }

        // TODO DELETE: if (overIdIndex === 0) overIdIndex = y > 0 ? overIdIndex : overIdIndex

        if (activeIdIndex > overIdIndex) {
          // when active is further to list end then over
          overIdIndex =
            y > 0
              ? overIdIndex + 1 // by drop on the bottom move active further to list end
              : overIdIndex
        }

        if (activeIdIndex < overIdIndex) {
          // when active is closer to list start then over
          overIdIndex =
            y > 0
              ? overIdIndex // by drop on the top move active closer to list start
              : overIdIndex - 1
        }
        // console.log("todosIdsOfStatusToCompare", todosIdsOfStatusToCompare)
        // console.log("overIdIndex", overIdIndex)
        // console.log("activeIdIndex", activeIdIndex)

        // console.log("sortedByUser before", sortedByUser)

        sortedByUser = moveActiveIndexInSortedByUserTo(overIdIndex)
        // console.log("sortedByUser after", sortedByUser)
      }

      return {
        ...state,
        todos: { ...state.todos, [activeId]: todoToUpdate },
        sortedByUser: sortedByUser,
      }
    }
    default:
      return { ...state }
  }
}

export const allTodosInState = (state) => state.todos
