import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    loadTodoList();
  }, []);

  const loadTodoList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("TodoList");
      if (storedList !== null) {
        setTodoList(JSON.parse(storedList));
      }
    } catch (err) {
      alert("Error loading to-do list: " + err);
    }
  };

  const saveTodoList = async (list) => {
    try {
      await AsyncStorage.setItem("TodoList", JSON.stringify(list));
    } catch (err) {
      alert("Error saving to-do list: " + err);
    }
  };

  const addTodo = async (todoText) => {
    if (!todoText.trim()) return;

    try {
      const newTodo = { id: Date.now(), text: todoText.trim() };
      const updatedList = [...todoList, newTodo];
      setTodoList(updatedList);
      await saveTodoList(updatedList);
    } catch (err) {
      alert("Error adding to-do: " + err);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        addTodo,
        setTodoList,
        saveTodoList,
        loadTodoList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
