import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({images, openModal}) => {
  return (
    
      <ul className={css.list}>
          {/* Набір елементів списку із зображеннями */}
      {images.map((image) => {
        return (
          <li  key={image.id} className={css.listItem } >
            <ImageCard image={image.urls.small} alt_description={image.alt_description} onClick={() => openModal(image) } />
           
            
</li>
        )
      })
      }
    
         </ul> 

    
  )
}

export default ImageGallery
