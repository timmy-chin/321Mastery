"use client"

import { useState } from "react";


function Home(){

    const [location, setLocation] = useState("")
    const [destination, setDestination] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [recur, setRecur] = useState(false)
    const [result, setResult] = useState([])

    const pfpList = [
        "https://g.foolcdn.com/editorial/images/760448/shiba-inu-dog-doge-dogecoin.jpeg",
        "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQgXnC_jmYjZKWSF9TaUw-8SEsKlZ2wFQ1LVJMJy4Aqn8eFktRZrZ5r-ZV6-Ea5i_nshjPSX5NDODqZZ60",
        "https://mymodernmet.com/wp/wp-content/uploads/2020/10/cooper-baby-corgi-dogs-8.jpg",
        "https://dogtime.com/wp-content/uploads/sites/12/2023/11/GettyImages-1329412827-e1701097258260.jpg?w=1024"
    ]

    const driverList = [
        {
            name: "Timmy",
            seat: 4,
            location: "Devaul Park",
            destination: "Cal Poly",
            date: "04/10/2024",
            time: "01:00",
            pfp: 0
        },
        {
            name: "Kylar",
            seat: 3,
            location: "Foothill",
            destination: "Bonderson",
            date: "05/10/2024",
            time: "02:00",
            pfp: 1
        },
        {
            name: "Ivan",
            seat: 2,
            location: "Laguna",
            destination: "Baker",
            date: "06/10/2024",
            time: "03:00",
            pfp: 2
        },
        {
            name: "Peter",
            seat: 1,
            location: "Pismo",
            destination: "PCV",
            date: "07/10/2024",
            time: "04:00",
            pfp: 3
        },
    ]


    function locationChanged(event){
        setLocation(event.target.value);
    }

    function destinationChanged(event){
        setDestination(event.target.value);
    }

    function dateChanged(event){
        setDate(event.target.value);
    }

    function timeChanged(event){
        setTime(event.target.value);
    }

    function recurChanged(event){
        setRecur(event.target.value);
    }


    function searchHandler(){
        var newResult = []
        {driverList.map((driver) => {
                if (driver.location == location || driver.destination == destination || driver.date == date || driver.time == time){
                    const newDriver = {
                        name: driver.name,
                        seat: driver.seat,
                        location: driver.location,
                        destination: driver.destination,
                        date: driver.date,
                        time: driver.time
                    }
                    newResult = newResult.concat(newDriver);
                    setResult(newResult);
                }
            });
        }
    }

    return (
    <div>
        <h1>Search Drivers</h1>

        <h4>Pick Up Location</h4>
        <input type="text" value={location} onChange={locationChanged} size="50"></input>

        <h4>Destination</h4>
        <input type="text" value={destination} onChange={destinationChanged} size="50"></input>

        <h4>Arrival Date & Time:</h4>
        <input type="text" value={date} onChange={dateChanged} size="20"></input>
        <img src="https://static.vecteezy.com/system/resources/previews/005/988/959/original/calendar-icon-free-vector.jpg" width="30" height="30" />
        <input type="text" value={time} onChange={timeChanged} size="20"></input>
        <img src="https://www.shutterstock.com/image-vector/clock-icon-trendy-flat-style-600nw-674379841.jpg" width="30" height="30" />

        <p></p>
        <a>Recurring?</a>
        <input type="checkbox" value={recur} onChange={recurChanged}></input>

        <p></p>

        <button onClick={searchHandler}>Search</button>

        <p></p>

        <h2>Drivers</h2>

        {result.map((driver, index) => (
            <div>
            <img src={pfpList[index]} width="100" height="100"></img>
            <h3 key={index}>{driver.name}</h3>
            <h5 key={index}>Seats: {driver.seat}</h5>
            <h5 key={index}>Pick Up Location: {driver.location}</h5>
            <h5 key={index}>Destination: {driver.destination}</h5>
            <h5 key={index}>Date: {driver.date}</h5>
            <h5 key={index}>Time: {driver.time}</h5>
            <p></p>
            </div>
        ))} 
    </div>
    )
}

export default Home;