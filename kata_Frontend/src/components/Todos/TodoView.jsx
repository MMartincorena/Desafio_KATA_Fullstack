import React, { Fragment, useContext, useEffect } from 'react'
import { TodoStore, HOST_API } from './TodoProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';


const TodoView = (props) => {
    const { dispatch, state } = useContext(TodoStore);


    useEffect(() => {
        fetch(HOST_API + "/todos/list/" + props.listId)
        .then((response) => response.json())
        .then((list) => {
            dispatch({ type: "update-list", list });
        })
        .catch(() => {});
    }, [state.list.length, dispatch]);

    const onDelete = (id) => {
        fetch(HOST_API + "/todos/" + id, {
            method: "DELETE",
        }).then(() => {
            dispatch({ type: "delete-item", id });
        });
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo });
    };

    const changeStatus = (todo) => {
        fetch(HOST_API + "/todos/status/" + todo.id,{
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then((todo) => {
            dispatch({ type: "update-item", item: todo });
          });
      };

    return (
        <Fragment>
            {
                (state.list.length > 0) ?
                    <div className='todo-header-info'>
                        <h3>ID</h3>
                        <h3>Nombre</h3>
                        <h3>Estado</h3>
                        <h3> </h3>
                    </div> 
                : <h3 className='empty-text'>Lista vacia</h3>
            }
            {state.list.map((todo) => { return (
                <div key={todo.id} className='todo-container-info'>
                    <h3 className={(todo.complete === true) ?'text-disabled' : ''}>{todo.id}</h3>
                    <h3 className={(todo.complete === true) ?'text-disabled' : ''}>{todo.name}</h3>
                    <div className='todo-btn-status-container'>
                        <button className={(todo.complete === true) ? 
                            'todo-btn-status status-complete' : 
                            'todo-btn-status status-incomplete' 
                            } onClick={() => changeStatus(todo)}>{(todo.complete === true) ? 
                                <FontAwesomeIcon icon={faThumbsUp} /> : <FontAwesomeIcon icon={faThumbsDown} />}</button>
                    </div>
                    <div className='todo-btn-container'>
                        <button className='todo-btn-delete' onClick={() => onDelete(todo.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <button disabled={todo.complete} className={(todo.complete === true) ? 
                            'todo-btn-edit-disabled' : 'todo-btn-edit' } 
                            onClick={() => onEdit(todo)}><FontAwesomeIcon icon={faEdit} /></button>
                    </div>
                </div> );
            })}
        </Fragment>
    );
}
 
export default TodoView;