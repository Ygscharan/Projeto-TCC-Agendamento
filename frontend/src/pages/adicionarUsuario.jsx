import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../adicionarUsuario.css';

function AdicionarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorId, setFornecedorId] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (tipo === 'FORNECEDOR') {
      axios.get('http://localhost:3000/api/fornecedores')
        .then(res => setFornecedores(res.data))
        .catch(err => console.error('Erro ao buscar fornecedores:', err));
    }
  }, [tipo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !tipo || (tipo === 'FORNECEDOR' && !fornecedorId)) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        nome,
        email,
        senha,
        tipo,
        fornecedor_id: tipo === 'FORNECEDOR' ? fornecedorId : null
      });

      console.log(response.data);
      setNome('');
      setEmail('');
      setSenha('');
      setTipo('');
      setFornecedorId('');
      setError('');
    } catch (err) {
      setError('Erro ao cadastrar usuário');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="titulo">Adicionar Usuário</h1>
      </header>
      <main className="main">
        <section className="secao-1">
          <form onSubmit={handleSubmit}>
            {/* Tipo vem primeiro */}
            <div className="campo">
              <label>Tipo:</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecione o tipo de usuário</option>
                <option value="FUNCIONARIO">Funcionário</option>
                <option value="FORNECEDOR">Fornecedor</option>
              </select>
            </div>

            {/* Campos exibidos somente após seleção do tipo */}
            {tipo && (
              <>
                <div className="campo">
                  <label>Nome:</label>
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="campo">
                  <label>E-mail:</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="campo">
                  <label>Senha:</label>
                  <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
              </>
            )}

            {/* Campos adicionais para FORNECEDOR */}
            {tipo === 'FORNECEDOR' && (
              <>
                <div className="campo">
                  <label>Empresa:</label>
                  <select value={fornecedorId} onChange={(e) => setFornecedorId(e.target.value)}>
                    <option value="">Selecione a empresa</option>
                    {fornecedores.map(f => (
                      <option key={f.id} value={f.id}>{f.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="campo">
                  <button
                    type="button"
                    className="botao"
                    onClick={() => navigate('/cadastrar-empresa')}
                  >
                    Cadastrar Empresa
                  </button>
                </div>
              </>
            )}

            {/* Botão de enviar aparece após seleção do tipo */}
            {tipo && (
              <button type="submit" className="botao">Cadastrar</button>
            )}

            {error && <div className="error">{error}</div>}
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdicionarUsuario;
