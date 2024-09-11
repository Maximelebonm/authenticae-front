import './modal.css'; // Assurez-vous de créer ce fichier pour les styles de la modal

const Modal = ({ show, onClose, children,onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h4 className="modal-title"></h4>
          <button onClick={onClose} className="modal-close-button">X</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
            <button onClick={onConfirm} className="modal-confirm-button">Oui</button>
          <button onClick={onClose} className="modal-close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
