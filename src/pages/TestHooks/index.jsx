import { useState, useCallback, useMemo } from 'react';
import Todos from './Todos';

const expensiveCalculation = (num) => {
  console.log('Calculating...');
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const TestHooks = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  // Lors de la modification du nombre ou de l'ajout d'une tâche, on remarque un retard d'exécution.
  //const calculation = expensiveCalculation(count);

  /*Pour résoudre ce problème de performances, nous pouvons utiliser le Hook useMemo
    pour mémoriser la fonction expensiveCalculation.*/
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  // Le composant Todos re-renders même lorsque le state todos ne change pas.
  /*const addTodo = () => {
    setTodos((t) => [...t, 'New Todo']);
  };*/

  /* Pour résoudre ce problème, nous pouvons utiliser le hook useCallback 
     pour empêcher la recréation de la fonction, sauf si nécessaire. */
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, 'New Todo']);
  }, [todos]);

  return (
    <div>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

export default TestHooks;
