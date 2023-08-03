type ImageUploadProps = {
  image?: string;
  uploadImage: () => void;
};

export default function ImageUpload({
  image,
  uploadImage,
}:
  ImageUploadProps) {
  return (
    <div
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      onClick={uploadImage}
    >
      <img
        src={
          image ?
            `data:image/jpg;base64,${image}` :
            "https://via.placeholder.com/200x100?text=Upload+Image"
        }
        alt="Uploaded Image"
        style={{ display: 'block', minHeight: '100px', minWidth: '100px', backgroundColor: 'lightgray' }}
      />
      <div
        className="image-upload-overlay"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
      </div>
    </div>
  );
}

