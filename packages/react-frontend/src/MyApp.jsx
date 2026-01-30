import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function removeOneCharacter(index) {
    try {
      const character_id = characters[index]._id;
      const res = await deleteUser(index);

      if (res.status === 204) {
        setCharacters((characters) =>
          characters.filter((character) => {
            return character._id !== character_id;
          }),
        );
      } else if (res.status === 404) {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // check prev. commit to see the promise/non-async version of this func
  async function updateList(person) {
    try {
      const res = await postUser(person);

      if (res.status === 201) {
        const newUser = await res.json();
        setCharacters([...characters, newUser]);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function deleteUser(index) {
    const character_id = characters[index]._id;
    const promise = fetch(`http://localhost:8000/users/${character_id}`, {
      method: "DELETE",
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
