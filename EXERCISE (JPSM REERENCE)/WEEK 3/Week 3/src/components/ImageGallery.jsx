import { useEffect, useState } from 'react';

const SAMPLE_IMAGES = [
  { id: 1, title: 'Mountain Landscape', url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/0a/80/70.jpg' },
  { id: 2, title: 'Forest Path', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQZFd2XwgWQrQNxu7NTfEZQkWHJwGWghmB5cDwL_IPw5l4Gl3h6Xu5G0M&s=10.jpg' },
  { id: 3, title: 'Ocean Waves', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS6DlezPJ0a9yZ5IWE_6SRfOxtmVOtDtNQQXPGsnFtE8XfnotzG21MV0o&s=10.jpg' },
  { id: 4, title: 'Starry Night', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCuXdHcS1wv1YbRGyu4lbOfimQM6CYtELLqz4JxKWa_Q&s=10.jpg' },
  { id: 5, title: 'Desert Dunes', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQugoI2Nd9foURoZq6IvSLo4s6f_agHd2VjmpMmAxxMIoFYV87-K3oSog4&s=10.jpg' },
];

export default function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          setSelectedIndex((prevIndex) => (prevIndex + 1) % SAMPLE_IMAGES.length);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          setSelectedIndex((prevIndex) =>
            prevIndex === 0 ? SAMPLE_IMAGES.length - 1 : prevIndex - 1,
          );
          break;
        case ' ':
          event.preventDefault();
          setIsFullscreen((prev) => !prev);
          break;
        case 'Escape':
          setIsFullscreen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedImage = SAMPLE_IMAGES[selectedIndex];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Keyboard Accessible Image Gallery</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>
        <strong>Controls:</strong> Click an image to select | <code>← / →</code> Navigate | <code>Space</code> Toggle Fullscreen | <code>Esc</code> Close Fullscreen
      </p>

      <div
        onClick={() => setIsFullscreen(true)}
        style={{
          border: '2px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '20px',
          cursor: 'pointer',
          textAlign: 'center',
          backgroundColor: '#000',
          maxHeight: '400px',
        }}
      >
        <img
          src={selectedImage.url}
          alt={selectedImage.title}
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {SAMPLE_IMAGES.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            style={{
              border: index === selectedIndex ? '3px solid #007bff' : '3px solid transparent',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              opacity: index === selectedIndex ? 1 : 0.6,
              transition: 'all 0.2s ease',
            }}
          >
            <img
              src={image.url}
              alt={image.title}
              style={{ width: '100px', height: '70px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>

      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'pointer',
          }}
        >
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#fff',
              border: 'none',
              padding: '8px 12px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Close (Esc)
          </button>
        </div>
      )}
    </div>
  );
}