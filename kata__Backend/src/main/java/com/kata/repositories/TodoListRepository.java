package com.kata.repositories;

import com.kata.models.TodoListModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoListRepository extends JpaRepository<TodoListModel, Long> {
}
