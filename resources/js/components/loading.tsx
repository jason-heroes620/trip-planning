import PulseLoader from "react-spinners/PulseLoader";

const Loading = () => {
    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <PulseLoader
                    color={"green"}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
};

export default Loading;
