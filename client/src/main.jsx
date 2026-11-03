import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const initialForm = {
  name: '',
  email: '',
  course: '',
  age: '',
};

function App() {
  const [menu, setMenu] = useState('cadastro');
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const loadStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/students');
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Não foi possível carregar os alunos.');
      }

      setStudents(data.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Erro ao carregar os alunos.' });
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) =>
      [student.name, student.email, student.course].some((field) =>
        String(field).toLowerCase().includes(query)
      )
    );
  }, [students, search]);

  const totalStudents = students.length;
  const averageAge = totalStudents
    ? Math.round(students.reduce((sum, student) => sum + Number(student.age), 0) / totalStudents)
    : 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        const errorMessage = Object.values(data.errors || {}).join(' ');
        throw new Error(errorMessage || data.message || 'Erro ao cadastrar aluno.');
      }

      setFormData(initialForm);
      setMenu('lista');
      setMessage({ type: 'success', text: data.message || 'Aluno cadastrado com sucesso.' });
      await loadStudents();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Não foi possível salvar o aluno.' });
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Sistema Acadêmico</p>
          <h1>Gerenciamento de Alunos</h1>
        </div>
        <span className="status-badge">Etapa 2</span>
      </header>

      <nav className="menu" aria-label="Menu principal">
        <button
          type="button"
          className={menu === 'cadastro' ? 'menu-item active' : 'menu-item'}
          onClick={() => setMenu('cadastro')}
        >
          Cadastrar aluno
        </button>
        <button
          type="button"
          className={menu === 'lista' ? 'menu-item active' : 'menu-item'}
          onClick={() => setMenu('lista')}
        >
          Listar alunos
        </button>
        <button
          type="button"
          className={menu === 'resumo' ? 'menu-item active' : 'menu-item'}
          onClick={() => setMenu('resumo')}
        >
          Resumo
        </button>
      </nav>

      <section className="content-panel">
        {menu === 'cadastro' && (
          <form className="student-form" onSubmit={handleSubmit}>
            <h2>Cadastro de Aluno</h2>

            <div className="field-grid">
              <label>
                Nome completo
                <input
                  type="text"
                  name="name"
                  placeholder="Ex.: Ana Paula"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Idade
                <input
                  type="number"
                  name="age"
                  min="1"
                  max="120"
                  placeholder="Ex.: 20"
                  value={formData.age}
                  onChange={handleChange}
                />
              </label>

              <label>
                E-mail
                <input
                  type="email"
                  name="email"
                  placeholder="Ex.: ana@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Curso
                <input
                  type="text"
                  name="course"
                  placeholder="Ex.: Análise e Desenvolvimento de Sistemas"
                  value={formData.course}
                  onChange={handleChange}
                />
              </label>
            </div>

            {message.text && (
              <p className={message.type === 'error' ? 'message error' : 'message success'}>
                {message.text}
              </p>
            )}

            <button type="submit" className="primary-button">
              Salvar aluno
            </button>
          </form>
        )}

        {menu === 'lista' && (
          <section className="list-panel">
            <div className="section-header">
              <h2>Lista de Alunos</h2>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar aluno"
                aria-label="Buscar aluno"
              />
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Curso</th>
                    <th>Idade</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.course}</td>
                        <td>{student.age} anos</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Nenhum aluno encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {menu === 'resumo' && (
          <section className="summary-panel">
            <h2>Resumo</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <span>Total de alunos</span>
                <strong>{totalStudents}</strong>
              </div>
              <div className="summary-card">
                <span>Média de idade</span>
                <strong>{averageAge} anos</strong>
              </div>
              <div className="summary-card">
                <span>Última ação</span>
                <strong>{message.type ? 'Registrada' : 'Sem ação'}</strong>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
