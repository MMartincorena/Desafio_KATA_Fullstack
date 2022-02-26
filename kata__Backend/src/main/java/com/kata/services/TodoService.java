package com.kata.services;

import java.util.List;

import com.kata.models.TodoModel;
import com.kata.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public TodoModel saveTodo(TodoModel todo){
        TodoModel _todo = todoRepository.save(new TodoModel(todo.getName(), todo.getIdTodoList()));
        return _todo;
    }

    public List<TodoModel> findAllTodos(){
        List<TodoModel> _todos = todoRepository.findAll();
        return _todos;
    }

    public List<TodoModel> findAllTodosOfList(Long idTodoList){
        List<TodoModel> todosOfList = todoRepository.findByIdTodoList(idTodoList);
        return todosOfList;
    }

    public TodoModel findTodo(Long id){
        TodoModel _todo = todoRepository.findById(id).orElseThrow();
        return _todo;
    }

    public TodoModel updateTodo(Long id, TodoModel todo){
        TodoModel _todo = todoRepository.findById(id).orElseThrow();
        if(todo.getName() != null) _todo.setName(todo.getName());
        if(todo.getIdTodoList() != null) _todo.setIdTodoList(todo.getIdTodoList());
        _todo.setComplete(todo.isComplete());
        TodoModel _todoUpdated = todoRepository.save(_todo);
        return _todoUpdated;
    }

    public void deleteAllTodos(){
        todoRepository.deleteAll();
    }

    public void deleteAllTodosOfList(Long idTodoList){
        List<TodoModel> todos = todoRepository.findByIdTodoList(idTodoList);
        for(TodoModel todo : todos){
            todoRepository.deleteById(todo.getId());
        }
    }

    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }

    public TodoModel changeStatusTodo(Long id){
        TodoModel _todo = todoRepository.getById(id);
        _todo.setComplete((_todo.isComplete() == true) ? false : true);
        TodoModel _todoUpdated = todoRepository.save(_todo);
        return _todoUpdated;
    }

}
