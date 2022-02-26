package com.kata.repositories;

import java.util.List;

import com.kata.models.TodoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<TodoModel, Long> {
    List<TodoModel> findByIdTodoList(Long idTodoList);
}
