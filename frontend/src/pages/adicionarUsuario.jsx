import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../adicionarUsuario.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
    <div className="ad-usuario-container">
      <div className="top-bar">
        <div className="navegacao-btns">
          <button onClick={() => navigate(-1)} className="voltar-btn">
            <ArrowLeft size={20} />
            <span className="texto-voltar">Voltar</span>
          </button>
          <button onClick={() => navigate(1)} className="avancar-btn">
            <span className="texto-avancar">Avançar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <header className="ad-usuario-header">
        <h1 className="ad-usuario-titulo">Adicionar Usuário</h1>
      </header>
      <main className="ad-usuario-main">
        <section className="ad-usuario-secao-1">
          <form onSubmit={handleSubmit}>
            {/* Tipo vem primeiro */}
            <div className="ad-usuario-campo">
              <label className="ad-usuario-label">Tipo:</label>
              <select className="ad-usuario-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecione o tipo de usuário</option>
                <option value="FUNCIONARIO">Funcionário</option>
                <option value="FORNECEDOR">Fornecedor</option>
              </select>
            </div>
            {tipo && (
              <>
                <div className="ad-usuario-campo">
                  <label className="ad-usuario-label">Nome:</label>
                  <input className="ad-usuario-input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="ad-usuario-campo">
                  <label className="ad-usuario-label">E-mail:</label>
                  <input className="ad-usuario-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="ad-usuario-campo">
                  <label className="ad-usuario-label">Senha:</label>
                  <input className="ad-usuario-input" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
              </>
            )}
            {tipo === 'FORNECEDOR' && (
              <>
                <div className="ad-usuario-campo">
                  <label className="ad-usuario-label">Empresa:</label>
                  <select className="ad-usuario-select" value={fornecedorId} onChange={(e) => setFornecedorId(e.target.value)}>
                    <option value="">Selecione a empresa</option>
                    {fornecedores.map(f => (
                      <option key={f.id} value={f.id}>{f.nome}</option>
                    ))}
                  </select>
                </div>
                <div className="ad-usuario-campo">
                  <button
                    type="button"
                    className="ad-usuario-botao"
                    onClick={() => navigate('/cadastrar-empresa')}
                  >
                    Cadastrar Empresa
                  </button>
                </div>
              </>
            )}
            {tipo && (
              <button type="submit" className="ad-usuario-botao">Cadastrar</button>
            )}
            {error && <div className="ad-usuario-error">{error}</div>}
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdicionarUsuario;
