
export default function NoDataView({ setApiStatus }) {
    return (
        <div className="non-success-container">
            <h2>No Flights Found</h2>
            <button
                type="button"
                className="btn"
                onClick={() => setApiStatus("initial")}
            >
                Retry
            </button>
        </div>
    );
}