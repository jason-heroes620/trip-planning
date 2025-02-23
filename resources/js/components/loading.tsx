import PulseLoader from 'react-spinners/PulseLoader';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen bg-gray-100 bg-opacity-50">
            <div className="m-auto">
                <PulseLoader
                    color={'green'}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
};

export default Loading;
