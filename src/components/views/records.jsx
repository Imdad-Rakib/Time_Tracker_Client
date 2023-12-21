import Navbar from "./navbar";
import { useEffect, useState } from "react";
import Barchart from "./barchart";

const Records = () =>{

  const [records, setRecords] = useState([]);
  useEffect(()=>{
    const getRecords = async() =>{
      try {
        let response = await fetch(`http://localhost:8000/timeTracking/report`, {
          method: 'GET',
          credentials: 'include'
        })
        response = await response.json();
        if (response.error) {
          alert('You must login first to view the contents of this page');
        }
        else {
          setRecords(response.report);
        }
      } catch (err) {
        alert('An error occured. Please try again.');
      }
    }
    getRecords();
  }, [])
  return (
    <div>
      <Navbar/>
      {
        records.map((weekly, index1) => {
            let totalTime = 0;
            return(
              <div key = {index1} className="text-center bg-gray-100 mb-20 pt-5 pb-1">
                  <h1 className="text-3xl font-bold mb-20 ">Week: {weekly[0].week}</h1>
                <div key={index1} className="text-center mb-10 flex justify-between ml-8 mr-8">
                  <div className="w-full md:w-1/2">
                    <table className="w-full border-collapse border border-gray-300 mb-5">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 p-2">Date</th>
                          <th className="border border-gray-300 p-2">Day</th>
                          <th className="border border-gray-300 p-2">Start Time</th>
                          <th className="border border-gray-300 p-2">End Time</th>
                          <th className="border border-gray-300 p-2">Duration</th>
                          <th className="border border-gray-300 p-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        { weekly.map((daily, index2) => {
                          const {date, day, start_time, end_time, total_duration, notes} = daily;
                          totalTime += daily.total_duration;
                          let hours = Math.floor(total_duration / 3600).toString().padStart(2, '0');
                          let minutes = Math.floor((total_duration % 3600) / 60).toString().padStart(2, '0');
                          return(
                            <tr key = {index1 * 10 + index2}>
                              <td className="border border-gray-300 p-2">{date}</td>
                              <td className="border border-gray-300 p-2">{day}</td>
                              <td className="border border-gray-300 p-2">{start_time}</td>
                              <td className="border border-gray-300 p-2">{end_time}</td>
                              <td className="border border-gray-300 p-2">{`${hours}:${minutes}`}</td>
                              <td className="border border-gray-300 p-2">{notes}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    {
                      (function(){
                        let hours = Math.floor(totalTime / 3600).toString().padStart(2, '0');
                        let minutes = Math.floor((totalTime % 3600) / 60).toString().padStart(2, '0');
                        return(
                          <p className="font-bold">Total hours worked this week:  {hours}:{minutes}</p>
                        );
                      })()
                    }
                  </div>
                  <Barchart data = {weekly}/>
                </div>
              </div>
            );
        })
      }
    </div>
  );
}

export default Records;