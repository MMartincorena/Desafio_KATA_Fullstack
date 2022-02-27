package com.kata.controller;

import java.util.List;

import com.kata.models.TodoModel;
import com.kata.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    
    @Autowired
    private TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoModel> createTodo(@RequestBody TodoModel todo){
        try{
            return new ResponseEntity<>(todoService.saveTodo(todo), HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping
    public ResponseEntity<List<TodoModel>> getAllTodos(){
        try{
            List<TodoModel> todos = todoService.findAllTodos();
            if(!todos.isEmpty()){
                return new ResponseEntity<>(todos, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping("/list/{idTodoList}")
    public ResponseEntity<List<TodoModel>> getAllTodosOfList(@PathVariable("idTodoList") Long idTodoList){
        try{
            List<TodoModel> todosOfList = todoService.findAllTodosOfList(idTodoList);
            if(!todosOfList.isEmpty()){
                return new ResponseEntity<>(todosOfList, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoModel> getTodo(@PathVariable("id") Long id){
        try{
            TodoModel todo = todoService.findTodo(id);
            if(todo != null){
                return new ResponseEntity<>(todo, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable("id") Long id, @RequestBody TodoModel todo){
        try{
            TodoModel todoListUpdated = todoService.updateTodo(id, todo);
            return new ResponseEntity<>(todoListUpdated, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<TodoModel> changeStatusTodo(@PathVariable("id") Long id){
        try{
            TodoModel todoListUpdated = todoService.changeStatusTodo(id);
            return new ResponseEntity<>(todoListUpdated, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllTodos(){
        try{
            todoService.deleteAllTodos();
            return new ResponseEntity<>("Todos los 'TODOs' han sido eliminados.", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping("/list/{idTodoList}")
    public ResponseEntity<String> deleteAllTodosOfList(@PathVariable("idTodoList") Long idTodoList){
        try{
            todoService.deleteAllTodosOfList(idTodoList);
            return new ResponseEntity<>("Todos los 'TODOs' de la lista '"+idTodoList+"' han sido eliminados.", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id){
        try{
            todoService.deleteTodo(id);
            return new ResponseEntity<>("El 'TODO' con id '"+id+"' ha sido eliminado.", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

}
