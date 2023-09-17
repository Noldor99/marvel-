import css from './Modal.module.sass';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, title, onClose, open }) => {
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  if (!open) return null;

  return (
    <div className={css.container} onClick={onClose}>
      <div className={css.body} onClick={handleContentClick}>
        <h2 className={css.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
