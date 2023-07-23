
export default function FailureView({ setApiStatus }) {
    return (
        <div className="non-success-container">
            <div className="failure-container">
                <h1>Oops! Something Went Wrong.</h1>
                <p>Please try again later.</p>
                <button
                    type="button"
                    className="btn"
                    onClick={() => setApiStatus("initial")}
                >
                    Ok
                </button>
            </div>
        </div>
    );
}