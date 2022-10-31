import BookEditor from "../../components/BookEditor";

const New = ({ onClose }) => {
  return (
    <div>
      <BookEditor onClose={onClose} />
    </div>
  );
};

export default New;
