package com.kata.controller;

import java.util.List;

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


import com.kata.models.TodoListModel;
import com.kata.services.ListTodoService;

//.\mvnw.cmd spring-boot:run

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/lists")
public class ListTodoController {

    @Autowired
    private ListTodoService todoListService;

    @PostMapping
    public ResponseEntity<TodoListModel> createTodoList(@RequestBody TodoListModel todoList){
        try{
            return new ResponseEntity<>(todoListService.saveTodoList(todoList), HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping
    public ResponseEntity<List<TodoListModel>> getAllTodoLists(){
        try{
            List<TodoListModel> todoLists = todoListService.findAllTodoLists();
            if(!todoLists.isEmpty()){
                return new ResponseEntity<>(todoLists, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoListModel> getTodoList(@PathVariable("id") Long id){
        try{
            TodoListModel todoList = todoListService.findTodoList(id);
            if(todoList != null){
                return new ResponseEntity<>(todoList, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodoList(@PathVariable("id") Long id, @RequestBody TodoListModel todoList){
        try{
            TodoListModel todoListUpdated = todoListService.updateTodoList(id, todoList);
            return new ResponseEntity<>(todoListUpdated, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllTodoLists(){
        try{
            todoListService.deleteAllTodoLists();
            return new ResponseEntity<>("Todas las listas de 'TODOs' han sido eliminadas.", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodoList(@PathVariable("id") Long id){
        try{
            todoListService.deleteTodoList(id);
            return new ResponseEntity<>("La lista de 'TODOs' con id '"+id+"' ha sido eliminada.", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}
