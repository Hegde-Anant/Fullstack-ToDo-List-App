import React,{useState,useEffect} from 'react'
import "./index.css"
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo.jsx'
import {db} from './firebase'
import {query, collection, onSnapshot, QuerySnapshot, updateDoc,doc, addDoc,deleteDoc,} from 'firebase/firestore'

const Style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}


function App() {

  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState('');

  // create todo
  const createTodo = async(e)=>{
    e.preventDefault(e);
    if(input === ''){
      alert('please enter Todo')
      return
    }
    await addDoc(collection(db,'todos'),{
      text: input,
      completed: false,
    })
    setInput('')
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q,(QuerySnapshot)=>{
      let todosArr = []
      QuerySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(),id: doc.id})
      });
      setTodos(todosArr)
    })
    return ()=> unsubscribe()
  }, [])
  
  // Update todo in firebase
  const toggleComplete = async (todo)=>{
    await updateDoc(doc(db, 'todos', todo.id),{
      completed: !todo.completed
    })
  }
  // Delete todo
  const deleteTodo = async (id) =>{
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
 
    <div className={Style.bg}>
      <div className={Style.container}>
        <h3 className={Style.heading}>To Do App</h3>
        <form onSubmit={createTodo} className={Style.form}>
          <input value={input} 
          onChange={(e)=> setInput(e.target.value)}
           className={Style.input} type="text" placeholder='Add ToDo' />
          <button className={Style.button}><AiOutlinePlus size={30}/></button>
        </form>
        <ul>
          {todos.map((todo, index)=>(
            <Todo key={index} todo={todo}
             toggleComplete={toggleComplete} 
             deleteTodo={deleteTodo}/>
          ))}    
        </ul>

        {todos.length < 1 ? null : <p className={Style.count}>{`you have ${todos.length} todos`}</p> }
        
      </div>
    </div>

  )
}

export default App
