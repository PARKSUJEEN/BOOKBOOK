import { useParams } from "react-router-dom";

const NullPage = () => {
  const { id } = useParams();
  return (
    <div className="NullPage">
      <div className="NullPage_wrap">
        <div className="bear">
          {id === undefined ? (
            <>
              <label>୧ʕ•̀ᴥ•́ʔ୨</label>
              <span>읽고 있는 책을 등록해주세요</span>
            </>
          ) : (
            <>
              <label>🍀</label>
            </>
          )}
        </div>
        <div className="info">
          <span>읽고 있는 책을 기록해주세요.</span>
        </div>
      </div>
    </div>
  );
};

export default NullPage;
