import React, { useRef, useContext, useState } from "react";
import { ListStore, HOST_API } from "./ListProvider";
// import Modal from "./Modal";



const ListForm = () => {
  const formListRef = useRef(null);
  const {
    dispatch,
    state: { item },
  } = useContext(ListStore);
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    // mensaje de error en caso de no definir un mensaje, o que el mismo este vacio
    if (
       typeof state.name === "undefined" 
    ) {
      window.alert("Ingrese un nombre de lista nuevo, y/o que no se repita");
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
        //  setMessage(false);
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
      // setMessage(true);
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
        // setMessage(false);
      });
  };

  return (
    <form ref={formListRef} className="list-form-container">
      <div className="list-form">
        <input
          id="input-list-name"
          type="text"
          name="name"
          placeholder="Lista de TO - DO"
          defaultValue={item.name}
          onChange={(event) => {
            setState({ ...state, name: event.target.value });
          }}
        ></input>
        {!item.id && <button onClick={onAdd}> AGREGAR</button>}
        {item.id && <button onClick={onEdit}> EDITAR</button>}
      </div>
    </form>
  );
};

export default ListForm;
