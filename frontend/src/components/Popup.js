import { useEffect } from 'react';

function Popup ({
  isOpen,
  name,
  onClose,
  replaceWrapper=false,
  children
}){

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <section 
      className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
      onClick={handleOverlay}
    >
      <div className={replaceWrapper ? replaceWrapper : "popup__wrapper"}>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </section>
  )
}

export default Popup;