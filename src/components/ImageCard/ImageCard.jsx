import css from "./ImageCard.module.css";

const ImageCard = ({ image, alt_description, onClick }) => {
  return (
    <div className={css.imageCard } onClick={onClick}>
      <img className={css.imageCardItem } src={image} alt={alt_description} />
    </div>
  )
}

export default ImageCard;
