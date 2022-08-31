import './Reserve.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`http://localhost:5000/api/hotels/rooms/${hotelId}`)
    const { dates } = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())

        const dates = []

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }
    const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
          allDates.includes(new Date(date).getTime())
        );
    
        return !isFound;
      };

    // console.log(data);
    const handleSelect = e => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    }

    const handleClick = async ()=>{
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`http://localhost:5000/api/rooms/availability/${roomId}`, {dates:allDates})
                return res.data
            }))
        } catch (err) {}
    }
    console.log(selectedRooms);
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
                                <div key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input disabled={!isAvailable(roomNumber)} type="checkbox" value={roomNumber._id} onChange={handleSelect} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">
                    Reserve Now!
                </button>
            </div>
        </div>
    );
};

export default Reserve;