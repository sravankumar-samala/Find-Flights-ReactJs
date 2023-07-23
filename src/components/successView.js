import { BiSolidPlaneAlt } from "react-icons/bi";

// function setObject(vehicle) {
//     switch (vehicle) {
//         case "Car":
//             return <AiFillCar />;
//         case "Aeroplane":
//             return <BiSolidPlaneAlt />;
//         case "Bus":
//             return <BiSolidBus />;
//         default:
//             return null;
//     }
// }

export default function SuccessView({ flightsList }) {
    return (
        <div className="flights-list-container">
            <div className="list-header">
                <h2>First Column</h2>
                <h2>Boarding From</h2>
                <h2>Destination To</h2>
                <h2>Amount</h2>
                <h2>Last Column</h2>
            </div>
            <ul>
                {flightsList.map((each, i) => (
                    <li className="flights-list-item" key={each.id}>
                        <p className="flight"><BiSolidPlaneAlt /></p>

                        <p>{each.boardingFrom}</p>
                        <p>{each.toDestination}</p>
                        <p>
                            <strong>{each.amount}/-</strong>
                        </p>
                        <button type='button' className="book-btn btn">
                            Book
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
