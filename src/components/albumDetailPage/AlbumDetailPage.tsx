import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Photo {
  id: number;
  url: string;
}

const AlbumDetailPage: React.FC = () => {
  const { albumName, albumImage } = useParams<{ albumName: string; albumImage?: string }>();
  
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, url: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/Naruto_vol._01.jpg' },
    { id: 2, url: 'https://criticalhits.com.br/wp-content/uploads/2022/03/goku_an6e.h720-768x561.webp' },
    // Adicione mais fotos conforme necessário
  ]);

  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhotoUrl(e.target.value);
  };

  const handleAddPhoto = () => {
    setPhotos([...photos, { id: photos.length + 1, url: newPhotoUrl }]);
    setNewPhotoUrl('');
  };

  const openPhotoModal = (photoIndex: number) => {
    setSelectedPhotoIndex(photoIndex);
  };

  const closePhotoModal = () => {
    setSelectedPhotoIndex(null);
  };

  const navigateToNextPhoto = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const navigateToPreviousPhoto = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  return (
    <div>
      <h1>Detalhes do Álbum: {albumName}</h1>
      {albumImage && (
        <label>
          Imagem Padrão:
          <img
            src={decodeURIComponent(albumImage)}
            alt="Imagem Padrão"
            onClick={() => openPhotoModal(-1)}
          />
        </label>
      )}
      <h2>Fotos do Álbum</h2>
      <ul>
        {photos.map((photo, index) => (
          <li key={photo.id}>
            <img
              src={photo.url}
              alt={`Foto ${photo.id}`}
              onClick={() => openPhotoModal(index)}
            />
          </li>
        ))}
      </ul>
      {selectedPhotoIndex !== null && (
        <div className="photo-modal" onClick={closePhotoModal}>
          <button onClick={navigateToPreviousPhoto}>Anterior</button>
          <img src={photos[selectedPhotoIndex].url} 
               alt={`Imagem ${selectedPhotoIndex + 1}`} 
               style={{width: 200,}}/>
          <button onClick={navigateToNextPhoto}>Próxima</button>
        </div>
      )}

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
