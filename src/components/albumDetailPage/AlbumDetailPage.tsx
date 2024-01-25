import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Photo {
  id: number;
  url: string;
}

const AlbumDetailPage: React.FC = () => {
  const { albumName, albumImage } = useParams<{ albumName: string; albumImage?: string }>();
  
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, url: 'caminho_da_foto_1.jpg' },
    { id: 2, url: 'caminho_da_foto_2.jpg' },
    // Adicione mais fotos conforme necessário
  ]);

  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');
  
  const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhotoUrl(e.target.value);
  };

  const handleAddPhoto = () => {
    // Adiciona uma nova foto ao álbum
    setPhotos([...photos, { id: photos.length + 1, url: newPhotoUrl }]);
    // Limpa o campo de input após adicionar a foto
    setNewPhotoUrl('');
  };

  return (
    <div>
      <h1>Detalhes do Álbum: {albumName}</h1>
      {albumImage && (
        <label>
          Imagem Padrão:
          <img src={decodeURIComponent(albumImage)} alt="Imagem Padrão" />
        </label>
      )}
      <h2>Fotos do Álbum</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.url} alt={`Foto ${photo.id}`} />
          </li>
        ))}
      </ul>

      <h2>Incluir Nova Foto</h2>
      <form>
        <label>
          URL da Nova Foto:
          <input type="text" value={newPhotoUrl} onChange={handlePhotoUrlChange} />
        </label>
        <button type="button" onClick={handleAddPhoto}>
          Incluir Foto
        </button>
      </form>
    </div>
  );
};

export default AlbumDetailPage;


