import { useState } from "react";
import Navbar from "./navbar";

export default function Home(){
    const initialRecord = {date: '', start_time: '', end_time: '', notes: '' }

    const [record, setRecord] = useState(initialRecord);
    const [editDate, setEditDate] = useState('');
    const [deleteDate, setDeleteDate] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [editedRecord, setEditedRecord] = useState(initialRecord);

    const handleChange = (field, value) => {
        setRecord((prevRecord) =>{
            return {
                ...prevRecord,
                [field]: value
            }
        });
    };
    const handleEdit = (field, value) => {
        setEditedRecord((prevRecord) => {
            return {
                ...prevRecord,
                [field]: value
            }
        });
    }
    const createEntry = async () =>{
        let {date, start_time, end_time, notes} = record;
        if(date === '' || start_time === '' || end_time === ''){
            alert('Fields cannot be blank');
            return;
        }
        if (start_time > end_time) {
            alert('Ending time can not be less than starting time');
            return;
        }
        try{
            let response = await fetch('https://time-tracker-api-6mlb.onrender.com/timeTracking/newEntry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date,
                    start_time,
                    end_time,
                    notes
                }),
                credentials: 'include'
            })
            response = await response.json();
            if(response.error){
                alert(response.error);
            }
            else{
                alert('New entry created.');
                setRecord({
                    date: '',
                    start_time:'',
                    end_time: '',
                    notes: ''
                })
            }

        }catch(err){
            alert('An error occured. Please try again.');
        }
    }

    const editRequest = async () =>{
        try {
            let response = await fetch(`https://time-tracker-api-6mlb.onrender.com/timeTracking/updateReq/${editDate}`, {
                method: 'GET',
                credentials: 'include'
            })
            response = await response.json();
            if (response.error) {
                alert(response.error);
            }
            else{
                const {date, start_time, end_time, notes} = response;
                setEditedRecord({
                    date,
                    start_time,
                    end_time,
                    notes,
                })
                setIsEditable(true);
            }
        } catch (err) {
            alert('An error occured. Please try again.');
        }
    }
    const editEntry = async () =>{
        let {date, start_time, end_time, notes } = editedRecord;
        if (start_time === '' || end_time === '') {
            alert('Fields cannot be blank');
            return;
        }
        if(start_time > end_time){
            alert('Ending time can not be less than starting time');
            return;
        }
        try {
            let response = await fetch('https://time-tracker-api-6mlb.onrender.com/timeTracking/updateEntry', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date,
                    start_time,
                    end_time,
                    notes
                }),
                credentials: 'include'
            })
            response = await response.json();
            if (response.error) {
                alert(response.error);
            }
            else {
                alert('Entry updatd');
                setEditedRecord({
                    date: '',
                    start_time: '',
                    end_time: '',
                    notes: ''
                })
                setIsEditable(false);
                setEditDate('');
            }

        } catch (err) {
            alert('An error occured. Please try again.');
        }
    }
    const deleteEntry = async () =>{
        try {
            let response = await fetch(`https://time-tracker-api-6mlb.onrender.com/timeTracking/deleteEntry/${deleteDate}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            response = await response.json();
            if (response.error) {
                alert(response.error);
            }
            else {
                alert('Deletion successfull');
                setDeleteDate('');
            }

        } catch (err) {
            alert('An error occured. Please try again.');
        }
    }

    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-4xl font-bold mb-10">Create</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Start Time</th>
                        <th className="border border-gray-300 p-2">End Time</th>
                        <th className="border border-gray-300 p-2">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 p-2">
                            <input
                                type="date"
                                value={record.date}
                                className="w-full focus:outline-none"
                                onChange={(e) => handleChange('date', e.target.value)}
                            />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <input
                                type="time"
                                value={record.start_time}
                                className="w-full focus:outline-none"
                                onChange={(e) => handleChange('start_time', e.target.value)}
                            />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <input
                                type="time"
                                value={record.end_time}
                                className="w-full focus:outline-none"
                                onChange={(e) => handleChange('end_time', e.target.value)}
                            />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <input
                                type="text"
                                value={record.notes}
                                className="w-full focus:outline-none"
                                onChange={(e) => handleChange('notes', e.target.value)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none mt-6"
                onClick={createEntry}
            > Submit
            </button>
            <div className="mt-8">
                <label className="block text-gray-700 text-4xl font-bold mb-8 mt-20">Edit</label>
                <p className= "mb-5">Enter the date of the entry to be updated: </p>
                <input
                    type="date"
                    className="border rounded w-full py-2 px-3 focus:outline-none"
                    value={editDate}
                    onChange={(e) => {
                        setIsEditable(false);
                        setEditDate(e.target.value);
                    }}
                />
                {isEditable && 
                    <table className="w-full border-collapse border border-gray-300 mt-10">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Start Time</th>
                                <th className="border border-gray-300 p-2">End Time</th>
                                <th className="border border-gray-300 p-2">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="time"
                                        value={editedRecord.start_time}
                                        className="w-full focus:outline-none"
                                        onChange={(e) => handleEdit('start_time', e.target.value)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="time"
                                        value={editedRecord.end_time}
                                        className="w-full focus:outline-none"
                                        onChange={(e) => handleEdit('end_time', e.target.value)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="text"
                                        value={editedRecord.notes}
                                        className="w-full focus:outline-none"
                                        onChange={(e) => handleEdit('notes', e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none mt-6"
                    onClick={() => {
                        if(isEditable) editEntry();
                        else editRequest();
                    }}
                > {isEditable ? "Save": "Submit"}
                </button>
            </div>
            <div className="mt-8">
                <label className="block text-gray-700 text-4xl font-bold mb-8 mt-20">Delete</label>
                <p className="mb-5">Enter the date of the entry to be deleted: </p>
                <input
                    type="date"
                    className="border rounded w-full py-2 px-3 focus:outline-none"
                    value={deleteDate}
                    onChange={(e) => {
                        setDeleteDate(e.target.value);
                    }}
                />
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none mt-6"
                    onClick={deleteEntry}
                > Delete
                </button>
            </div>
        </div>
    </>
    );
}