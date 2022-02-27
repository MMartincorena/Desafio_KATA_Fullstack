import React, { useRef, useContext, useState } from "react";
import { ListStore, HOST_API } from "./ListProvider";

const ListForm = () => {
  const formListRef = useRef(null);
  const {
    dispatch,
    state: { item },
  } = useContext(ListStore);
  const [state, setState] = useState(item);

  const [message, setMessage] = useState(false);

  const onAdd = (event) => {
    event.preventDefault();

    // mensaje de error en caso de no definir un mensaje, o que el mismo este vacio
    if (
      typeof state.name === "undefined" ||
      state.name.length < 3 ||
      state.name.length > 30
    ) {
      setMessage(true);
      return;
    }
    const request = {
      name: state.name,
      id: null,
    };
    fetch(HOST_API + "/lists", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((list) => {
        dispatch({ type: "add-item", item: list });
        setState({ name: "" });
        formListRef.current.reset();
        setMessage(false);
      });
  };

  const onEdit = (event) => {
    event.preventDefault();
    setState(item);
    if (
      typeof state.name === "undefined" ||
      state.name.length < 3 ||
      state.name.length > 30
    ) {
      setMessage(true);
      return;
    }
    const request = {
      name: state.name,
      id: item.id,
    };
    fetch(HOST_API + "/lists/ " + item.id, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((list) => {
        dispatch({ type: "update-item", item: list });
        setState({ name: "" });
        formListRef.current.reset();
        setMessage(false);
      });
  };

  return (
    <form ref={formListRef} className="list-form-container">
      <div className="list-form">
        <input
          id="input-list-name"
          type="text"
          name="name"
          placeholder="Ingrese el nombre de la lista"
          defaultValue={item.name}
          onChange={(event) => {
            setState({ ...state, name: event.target.value });
          }}
        ></input>
        {!item.id && <button onClick={onAdd}> AGREGAR</button>}
        {item.id && <button onClick={onEdit}> EDITAR</button>}
      </div>
      {/* <p className={(message === true) ? 'errorMessage show' : 'errorMessage'}>You must enter between 3 and 30 characters.</p> */}
    </form>
  );
};

export default ListForm;
