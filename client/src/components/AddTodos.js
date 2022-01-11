import { useState, useRef, useEffect, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { ADD_TODO, UPDATE_TODO } from "../graphql/Mutation";
import { GET_TODO, GET_TODOS } from "../graphql/Query";
import { TodoContext } from '../TodoContext';

export const AddTodos = () => {
  const inputAreaRef = useRef();
  const { selectedId, setSelectedId } = useContext(TodoContext);
  const initState = { title: "", detail: "", date: "" };
  const [todo, setTodo] = useState(initState);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  useQuery(GET_TODO, {
    variables: { id: selectedId }, onCompleted: (data) => setTodo(data.getTodo)
  });

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Outside input area");
        setSelectedId(0);
      } else {
        console.log("Inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [inputAreaRef, setSelectedId]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!todo.title) {
      alert('Please add a valid title');
      return;
    }
    if (!selectedId) {
      addTodo({
        variables: {
          title: todo.title,
          detail: todo.detail,
          date: todo.date,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });
    } else {
      updateTodo({
        variables: {
          id: selectedId,
          title: todo.title,
          detail: todo.detail,
          date: todo.date,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });

    }
    setTodo(initState);
    setSelectedId(0);
  };

  return (
    <div>
      <form onSubmit={onSubmit} ref={inputAreaRef}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter a title"
            value={todo.title}
            onChange={(e) => {
              setTodo({ ...todo, title: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label>Detail</label>
          <input
            type="text"
            className="form-control"
            placeholder="Detail"
            value={todo.detail}
            onChange={(e) => {
              setTodo({ ...todo, detail: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={moment(todo.date).format("yyyy-MM-DD")}
            onChange={(e) => {
              setTodo({ ...todo, date: e.target.value });
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {!selectedId ? 'Add' : 'Update'}
        </button>
      </form>
    </div>
  );
};
