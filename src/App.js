import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      owner: "Victor Menegazzo"
    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const removedRepo = repositories.filter((repo) => repo.id !== id);
    await api
      .delete(`/repositories/${id}`)
      .then((response) => {
        if (response.status === 204) setRepositories(removedRepo);
      })
  }

  return (
    <div>
      <ul data-testid="repository-list">
      
        {repositories.map((repository, i) => 
        
          <li key={i}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
