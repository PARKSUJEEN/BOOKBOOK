import BookEditor from "../components/BookEditor";
import ModalTest from "./ModalTest";

const New = ({ onClose }) => {
  return (
    <div>
      <BookEditor onClose={onClose} />
    </div>
  );
};

export default New;
