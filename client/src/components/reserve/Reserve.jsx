import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from '../../hooks/useFetch';

const Reserve = ({ setOpen, hotelId }) => {
    
    const { data, loading, error } = useFetch(`http://localhost:5000/api/hotels/rooms/${hotelId}`)

    console.log(data);
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms:</span>
                {data.map(item => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.description}</div>
                            <div className="rMax">Max people: {item.maxPeople}</div>
                            <div className="rMax">Max people: {item.price}</div>
                            {item.roomNumbers.map(roomNumber => (
                                <div>
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber.unavailableDates} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reserve;