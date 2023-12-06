export function UploadImage({handleImageChange}){

    function handleImageUpload(e){
        handleImageChange(e)
    }
    return(
        <input type="file"  onChange={(e)=>handleImageUpload(e)} />
    )
}