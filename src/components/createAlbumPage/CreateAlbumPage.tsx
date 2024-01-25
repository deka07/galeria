import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Album {
  id: number;
  name: string;
  image: string;
}

const CreateAlbumPage: React.FC = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [newAlbum, setNewAlbum] = useState<Album>({ id: 0, name: '', image: 'caminho_da_imagem_padrao.jpg' });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAlbum({ ...newAlbum, name: e.target.value });
  };

  const handleCreateAlbum = () => {
    // Cria um novo álbum com um ID único
    const createdAlbum: Album = { ...newAlbum, id: albums.length + 1 };
    
    // Adiciona o novo álbum à lista de álbuns
    setAlbums([...albums, createdAlbum]);

    // Redireciona para a página de detalhes do álbum recém-criado
    // navigate(`/album/${encodeURIComponent(createdAlbum.name)}/${encodeURIComponent(createdAlbum.image)}`);
  };

  return (
    <div>
      <h1>Criar Álbum</h1>
      <form>
        <label>
          Nome do Álbum:
          <input type="text" value={newAlbum.name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Imagem Padrão:
          <img src={newAlbum.image} alt="Imagem Padrão" />
        </label>
        <br />
        <button type="button" onClick={handleCreateAlbum}>
          Criar Álbum
        </button>
      </form>

      <h2>Álbuns Criados</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <button onClick={() => navigate(`/album/${encodeURIComponent(album.name)}`)}>
              {album.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateAlbumPage;
