import { useState } from 'react';
import "./App.css";
import { GET_TODOS } from "./graphql/Query";
import { useQuery } from "@apollo/client";
import { AddTodos } from "./components/AddTodos";
import { Todo } from "./components/Todo";
import { TodoContext } from './TodoContext';

function App() {
  const [selectedId, setSelectedId] = useState(0);
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading || error) {
    return <p>{loading ? "loading..." : error.message}</p>;
  }

  return (
    <TodoContext.Provider value={ { selectedId, setSelectedId } }>
      <div className="container todobox">
        <AddTodos />
        <div className="list-group mt-4">
          {data?.getTodos.map((todo) => (
            <Todo key={todo.id} {...todo} onSetSelectedId={setSelectedId}/>
          ))}
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
