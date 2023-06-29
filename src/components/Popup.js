import { useEffect } from "react";
const Popup = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [isOpen, onClose])
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={handleOverlay}>
     <div className={`popup__container `}>  
        {children}
        <button
          type="button"
          className="popup__exit"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;