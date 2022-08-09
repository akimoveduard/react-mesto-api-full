import Popup from './Popup';

function ImagePopup({
  isOpen,
  onClose,
  card
}) {

  return (
    <Popup
      isOpen={isOpen}
      name='mesto'
      onClose={onClose}
      replaceWrapper='mesto'
    >
      <figure className="mesto__figure">
        <img className="mesto__image" src={card.link} alt={card.name} />
        <figcaption className="mesto__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;