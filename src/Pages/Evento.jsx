import { useState, useEffect } from "react";

const API_URL = "https://blessmile-het5.onrender.com";

function Admin() {
  const [autorizado, setAutorizado] = useState(false);
  const [senha, setSenha] = useState("");
  const [evento, setEvento] = useState("");
  const [fotos, setFotos] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN REAL
  useEffect(() => {
    const login = async () => {
      const senhaSalva = localStorage.getItem("adminSenha");

      if (senhaSalva) {
        const ok = await validarSenha(senhaSalva);
        if (ok) {
          setSenha(senhaSalva);
          setAutorizado(true);
          return;
        } else {
          localStorage.removeItem("adminSenha");
        }
      }

      const input = prompt("Digite a senha do admin:");

      if (!input) return;

      const ok = await validarSenha(input);

      if (ok) {
        localStorage.setItem("adminSenha", input);
        setSenha(input);
        setAutorizado(true);
      } else {
        alert("Senha incorreta ❌");
        window.location.reload();
      }
    };

    login();
  }, []);

  // 🔥 VALIDA NO BACKEND
  const validarSenha = async (senha) => {
    try {
      const res = await fetch(`${API_URL}/validar-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": senha,
        },
      });

      return res.ok;
    } catch {
      return false;
    }
  };

  if (!autorizado) {
    return <h1 style={{ textAlign: "center" }}>Acesso negado</h1>;
  }

  // 📸 UPLOAD
  const handleUpload = (e) => {
    const arquivos = Array.from(e.target.files);
    setFotos(arquivos);
    setPreview(arquivos.map((f) => URL.createObjectURL(f)));
  };

  const removeFoto = (index) => {
    setFotos(fotos.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!evento || fotos.length === 0) {
      alert("Preencha tudo");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("evento", evento.toLowerCase().trim());

      fotos.forEach((f) => formData.append("fotos", f));

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          "x-admin-password": senha,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      alert("Upload feito 🚀");

      setEvento("");
      setFotos([]);
      setPreview([]);

    } catch (err) {
      console.error(err);
      alert("Erro ❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminSenha");
    window.location.reload();
  };

  return (
    <div className="admin-container">
      <h1>Painel Admin</h1>

      <button onClick={logout}>Sair</button>

      <input
        type="text"
        placeholder="Evento"
        value={evento}
        onChange={(e) => setEvento(e.target.value)}
      />

      <input type="file" multiple onChange={handleUpload} />

      {preview.map((img, i) => (
        <div key={i}>
          <img src={img} width={100} />
          <button onClick={() => removeFoto(i)}>X</button>
        </div>
      ))}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Enviando..." : "Salvar"}
      </button>
    </div>
  );
}

export default Admin;