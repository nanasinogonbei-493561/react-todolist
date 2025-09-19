import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

export default function App() {
  const [text,  setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [composing, setComposing] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (composing) return;
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: t}]);
    setText('');
  }, [text, composing]);

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div id='container'>
      <form id='todo-form' onSubmit={handleSubmit} autoComplete="off">
        <input
          id='text-input' 
          type='text' 
          placeholder='Todoを入力してください' 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
        />
        <button type='submit' id='add-btn'>追加</button>
      </form>

      <ul id='todo-list'>
        {todos.map((item) => (
          <li key={item.id} className='list-item'>
            <span className='todo-text'>{item.text}</span>
            <button
              type='button' 
              className='delete-button' 
              onClick={() => handleDelete(item.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}