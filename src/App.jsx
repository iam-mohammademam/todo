import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItems] = useState(getLocalStorage("todoList") || []);
  const [editItemId, setEditItemId] = useState("");

  const handleClick = () => {
    if (!inputValue) return alert("Task can't be empty");

    if (editItemId && inputValue) {
      setTodoItems((prevItems) =>
        prevItems.map((todoItem) =>
          todoItem.id === editItemId
            ? {
                ...todoItem,
                value: inputValue,
                updatedAt: new Date().getTime()
              }
            : todoItem
        )
      );

      setEditItemId("");
      setInputValue("");
    } else {
      setTodoItems((prevItems) => [
        ...prevItems,
        {
          id: new Date().getTime().toString(),
          value: inputValue,
          updatedAt: ""
        }
      ]);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    const filterItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(filterItems);
  };

  const handleEdit = (id) => {
    const editTodo = todoItems.find((item) => item.id === id);
    setEditItemId(id);
    setInputValue(editTodo.value);
  };

  useEffect(() => {
    setLocalStorage("todoList", todoItems);
  }, [todoItems]);

  return (
    <>
      <div className="w-screen h-screen px-[5%] flex items-center justify-center">
        <div className="min-[700px]:w-[50%]">
          <div className="border border-black/[.4] h-11  rounded-sm overflow-hidden flex items-center ">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => {
                if (inputValue && e.key === "Enter") {
                  handleClick();
                } else {
                  return;
                }
              }}
              placeholder="Add a task"
              className="placeholder-black/[0.6] text-lg tracking-wide font-medium bg-transparent border outline-0 border-0 w-full text-md h-10 px-2"
            />
            {/*   Add Todo Button   */}
            <button
              onClick={() => handleClick()}
              className="bg-black text-white text-xl h-11 w-12 flex items-center justify-center">
              <AiOutlinePlus />
            </button>
          </div>
          <ul className="todo_items mt-4 flex w-full flex-col gap-2">
            {todoItems?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex border-b text-md border-b-black/[.4] px-2 py-1.5 items-center justify-between w-full font-medium">
                  {index + 1}. {item?.value}
                  <div className="icons flex items-center gap-3">
                    <FiEdit onClick={() => handleEdit(item?.id)} className="" />
                    <FaTrashAlt
                      onClick={() => handleDelete(item?.id)}
                      className="text-sm"
                    />
                  </div>
                </li>
              );
            })}
            {todoItems?.length > 0 && (
              <button
                onClick={() => setTodoItems([])}
                className="bg-slate-800 mt-3 text-white py-2 px-4 rounded-sm">
                Clear Tasks
              </button>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
