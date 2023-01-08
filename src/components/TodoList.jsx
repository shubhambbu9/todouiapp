
import React, { useEffect, useState } from 'react'



const TodoList = () => {

  //Getting data from local storage

  const getLocalStorage = ()=>{
    const list = localStorage.getItem("addingToStorage")

    if(list){
      return JSON.parse(list)
    }else{
      return []
    }
  }


  const [item, setItem] = useState('');
  const [todo, setTodo] = useState(getLocalStorage());
  const [editItems, setEditItems]= useState('')
  const [toggle, setToggle] = useState(false)


  const onclickBtn = () => {
    if (!item) {
      alert("please add some items !")
    }
    else if (item && toggle){
      setTodo(
        todo.map((curElem)=>{
          if(curElem.id === editItems){
            return {...curElem , name : item};
          }
          return curElem;
        })
      )
      setToggle(false);
    }
    else {
      const myNewInputData = {
        id: new Date().toString(),
        name: item
      }
      setTodo([...todo, myNewInputData]);
    }
    setItem("")
  }
  // edit the item 

  const editBtn = (index)=>{
    const edit_the_item = todo.find((curElem)=>{
      console.log(curElem);
      return curElem.id === index;
    })
    setItem(edit_the_item.name);
    setEditItems(index);
    setToggle(true);
  }

  // delete the item
  const deletebtn = (index) => {
    const updatedData = todo.filter((curElem) => {
      // console.log(curElem);
      return curElem.id !== index;
    })
    setTodo(updatedData)
  }

  // clear all button

  const clearAll = () => {
    setTodo([]);
  }
  // adding data to local Storage

  useEffect(() => {
    localStorage.setItem("addingToStorage", JSON.stringify(todo))
  }, [todo])

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <i className="fa-sharp fa-solid fa-clipboard-list"></i>
          <figcaption className='fig-caption'>Add your list here ✌</figcaption>
          <div className="input-div">
            <input
              type="text"
              placeholder='✍ Add items ...'
              value={item}
              className='input-field'
              onChange={(props) => setItem(props.target.value)}
            />
            <span className='add-btn'>
            {toggle ? <i className="fa-regular fa-pen-to-square"  onClick={onclickBtn}></i>
            : <i className="fa-solid fa-plus" onClick={onclickBtn}></i>
            }
            
            </span>
          </div>
          <div className='toDo-list-item'>
            {todo.map((curval) => {
              return (
                <div className="main-todo" key={curval.id}>
                  <h2 className='list-of-todo'>{curval.name} 
                    <span className='list-icons'>
                      <i className="fa-solid fa-trash" onClick={() => deletebtn(curval.id)}></i>
                      <i className="fa-regular fa-pen-to-square" onClick={()=> editBtn(curval.id)}></i>
                    </span>
                  </h2>
                </div>
              )
            }
            )}
          </div>
          <button className='clear-items' onClick={clearAll}>Delete All</button>
        </div>
<p> 'Made with ❤ by shubham' </p>
      </div>
    </>
  )
}

export default TodoList;
