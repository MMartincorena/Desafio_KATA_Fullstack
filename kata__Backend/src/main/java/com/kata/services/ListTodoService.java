package com.kata.services;

import java.util.List;

import com.kata.models.TodoListModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kata.models.TodoListModel;
import com.kata.repositories.TodoListRepository;

@Service
public class ListTodoService {

    @Autowired
    private TodoListRepository todoListRepository;

    @Autowired
    private TodoService todoService;

    public TodoListModel saveTodoList(TodoListModel todoList){
        TodoListModel _todoList = todoListRepository.save(new TodoListModel(todoList.getName()));
        return _todoList;
    }

    public List<TodoListModel> findAllTodoLists(){
        List<TodoListModel> todoLists = todoListRepository.findAll();
        return todoLists;
    }

    public TodoListModel findTodoList(Long id){
        TodoListModel _todoList = todoListRepository.findById(id).orElseThrow();
        return _todoList;
    }

    public TodoListModel updateTodoList(Long id, TodoListModel todoList){
        TodoListModel _todoList = todoListRepository.findById(id).orElseThrow();
        if(todoList.getName() != null) _todoList.setName(todoList.getName());
        TodoListModel _todoListUpdated = todoListRepository.save(_todoList);
        return _todoListUpdated;
    }

    public void deleteAllTodoLists(){
        todoService.deleteAllTodos();
        todoListRepository.deleteAll();
    }

    public void deleteTodoList(Long id){
        todoService.deleteAllTodosOfList(id);
        todoListRepository.deleteById(id);
    }

}
