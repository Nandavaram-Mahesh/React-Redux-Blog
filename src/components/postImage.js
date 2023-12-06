export function PostImage({imageUrl}){
    return (
        <div>
              <h2>Preview:</h2>
              <img
                src={imageUrl}
                alt="Selected"
                style={{ maxWidth: '100%', maxHeight: '20px' }}
              />
            </div>
    )
}