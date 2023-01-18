import React, { useEffect , useState} from 'react';

function ConferenceForm() {
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    const [maxPresentations, setMaxPresentations] = useState('')
    const [maxAttendees, setMaxAttendees] = useState('')
    const [location, setLocation] = useState('')
    const [locations, setLocations] = useState([])

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleStartDateChange = (event) => {
        const value = event.target.value
        setStartDate(value)
    }

    const handleEndDateChange = (event) => {
        const value = event.target.value
        setEndDate(value)
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value
        setDescription(value)
    }

    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value
        setMaxPresentations(value)
    }

    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value
        setMaxAttendees(value)
    }

    const handleLocationChange = (event) => {
        const value = event.target.value
        setLocation(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = name
        data.starts = startDate
        data.ends = endDate
        data.description = description
        data.max_presentations = maxPresentations
        data.max_attendees = maxAttendees
        data.location = location
        console.log(data)

        const conferenceURL = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(conferenceURL, fetchConfig);
        if (response.ok) {
          const newConference = await response.json();
          console.log(newConference);

          setName('');
          setStartDate('');
          setEndDate('');
          setDescription('');
          setMaxPresentations('');
          setMaxAttendees('');
          setLocation('');
        }
      }


    const fetchData = async() => {
    const url = 'http://localhost:8000/api/locations/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setLocations(data.locations)
    }
    }
    useEffect(() => {
        fetchData();
      }, []);

  return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStartDateChange} value={startDate} placeholder="Start date" required type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Start date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEndDateChange} value={endDate} placeholder="End date" required type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="ends">End date</label>
              </div>
              <div>
                <div className="mb-3">
                    <textarea className="form-control" onChange={handleDescriptionChange} value={description} id="exampleFormControlTextarea1" rows="3" placeholder="Description" name="description"></textarea>
                  </div>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxPresentationsChange} value={maxPresentations} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                <label htmlFor="maximum_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxAttendeesChange} value={maxAttendees} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                <label htmlFor="maximum_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} value={location} required id="location" name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(location => {
                    return (
                    <option key={location.href} value={location.id}>
                        {location.name}
                    </option>
                    );
                })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default ConferenceForm;
