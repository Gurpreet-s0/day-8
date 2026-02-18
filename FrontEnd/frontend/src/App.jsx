import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [changedtitle, setchangedtitle] = useState("");
  const [changeddesc, setchangeddesc] = useState("");

  const [notes, setnotes] = useState([{}]);
  function getdata() {
    axios.get("https://server-bw13.onrender.com/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }

  useEffect(() => {
    getdata();
  }, []);

  function formHandler(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    axios
      .post("https://server-bw13.onrender.com/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data.note);
        getdata();
      });
  }

  function deletehandler(id) {
    axios.delete(`https://server-bw13.onrender.com/notes/${id}`).then((res) => {
      console.log(res);
      getdata();
    });
  }

  function updateHandler(id) {
    // const newtity = prompt("new tity :")
    // const newdesc = prompt("new desc:")

    axios
      .patch(`https://server-bw13.onrender.com/notes/${id}`, {
        title: changedtitle,
        description: changeddesc,
      })
      .then((res) => {
        getdata();
        console.log(res.data);
      });
  }

  return (
    <>
      <form onSubmit={formHandler} className="form">
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>

      {notes.map((e) => {
        return (
          <div className="cards">
            <h1>{e.title}</h1>
            <p>{e.description}</p>
            <button
              onClick={() => {
                deletehandler(e._id);
              }}
            >
              delete
            </button>
            <input
              onChange={(e) => {

                setchangedtitle(e.target.value)
              }}
              type="text"
              placeholder="change title"
              value={changedtitle}
            />
            <input  onChange={(e) => {

                setchangeddesc(e.target.value)
              }} type="text" placeholder="change desc" value={changeddesc} />
            <button
              onClick={() => {
                updateHandler(e._id);
              }}
            >
              Update
            </button>
          </div>
        );
      })}
    </>
  );
};

export default App;
