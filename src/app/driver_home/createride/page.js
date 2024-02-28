import Image from 'next/image'

export default function Home() {
  return (
    <>
      <h1>Post a Ride</h1>
      <p>
        Start Location
      </p>
      <input type="text"/>

      <p>
        End Location
      </p>
      <input type="text"/>

      <p></p>


      <label><input type="checkbox"/>Reoccuring?</label>

      <p></p>

      <label><input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/>  <input type="checkbox"/></label>

      <p>  S   M T W Th F Sat</p>

      <p>Time</p>
      <label><input type="text"/>
      <input type="checkbox"/>AM
      <input type="checkbox"/>PM
      </label>

      
      

      <p>Seat(s)</p>
      <input type="text"/>

      <p>Price (USD)</p>
      <input type="text"/>

      <p></p>

      <button type="button">Post Ride</button>



    </>
  )
}
