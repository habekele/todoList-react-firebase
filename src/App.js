import React,{useState,useEffect} from "react";
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from "./Todo";
import {collection,onSnapshot,query, updateDoc, doc, addDoc,deleteDoc, } from "firebase/firestore";
import {db} from "./firebase";

const style = {
  bg: `h-screen w-screen p-4 bg-[#F9E2AF]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  header: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-4 w-full text-xl`,
  button: `border p-4 ml-2 bg-[#009FBD] text-slate-100`,
  count: `text-center p-2 `
}

function App() {
  const [todos, setTodos] = useState([])
  const[input, setInput] = useState('')



//create Todo
const createTodo = async (e) => {
  e.preventDefault(e)  
  if(input === ''){
    alert('Please enter a valid input')
    return
  }
  await addDoc(collection(db, 'todos'),{
    text: input,
    completed: false
  })
  setInput('')
};
//read todo from firebase
useEffect(()=>{
const q = query(collection(db,'todos'));
const unsubscribe= onSnapshot(q,(querySnapshot)=> {
  let todosArr = [];
  querySnapshot.forEach((doc)=>
  {
    todosArr.push({...doc.data(),id: doc.id});
  });
  setTodos(todosArr)
})
return () =>  unsubscribe()
},[])
//update todo in firebase
const toggleComplete = async(todo) => {
  await updateDoc(doc(db,'todos',todo.id),{
    completed: !todo.completed
  })
}
//delete todo
const deleteTodo = async(id) => {
  await deleteDoc(doc(db,'todos', id))

}
useEffect(()=>{
  document.title="Todo Application"
},[]);



  return (
    <div className={style.bg}>
      <div className={style.container}>
      <h3 className={style.header}> To Do List</h3>
      <form onSubmit={createTodo} className={style.form}>
        <input value={input} onChange={(e)=> setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo"></input>
        <button className={style.button}>
          <AiOutlinePlus size={30}/>
          </button>
      </form>
      <ul>
        {todos.map((todo,index)=>(
          <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
        ))}
      </ul>
      {todos.length < 1? null :
       <p className = {style.count}>{`You have ${todos.length} todos`}</p> }
     
      </div>
    </div>
  );
}

export default App;
