import { CirclesWithBar } from "react-loader-spinner";

const Spiner = ({ visible }) => {
  return (
    <>
      {visible && (
        <>
          <CirclesWithBar
            height="100"
            width="100"
            color=""
            wrapperStyle={{}}
            wrapperClass="justify-center mt-10 mb-5"
            visible={true}
            outerCircleColor="#26DBFD"
            innerCircleColor="#7DEBFF"
            barColor="#26DBFD"
            ariaLabel="circles-with-bar-loading"
          />
          <p className="text-center text-cyan-300 text-xl">Please wait a moment, the data is loading.</p>
        </>
      )}
    </>
  );
};

export default Spiner;
