import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="app-shell">
      <h1>Sistema de Gerenciamento de Alunos</h1>
      <p>Frontend React inicializado com sucesso.</p>
      <button
        onClick={async () => {
          try {
            const response = await fetch('http://localhost:3001/api/health');
            const data = await response.json();
            alert(data.message || 'Conexão com a API');
          } catch (error) {
            alert('Não foi possível conectar ao backend.');
          }
        }}
      >
        Verificar API
      </button>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
