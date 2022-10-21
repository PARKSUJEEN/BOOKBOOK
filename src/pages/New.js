import BookEditor from "../components/BookEditor";
import Modal from "./Modal";

const New = ({ onClose }) => {
  return (
    <div>
      <BookEditor onClose={onClose} />
    </div>
  );
};

export default New;
