import { useEffect, useState } from 'react'
import './App.scss'

function App() {
  // State to store regions
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  // Fetch regions when the component mounts
  useEffect(() => {
    console.log("Fetching regions..."); 
    fetch('/the_coche-events/regions.php')
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);  // Save regions data into state
      })
      .catch((error) => {
        console.error('Error fetching regions:', error);
      });
  }, []);

  // Handle the region selection
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);  // Update selected region state
  };

  return (
    <>
      <div>
          {/* Region dropdown */}
          <select value={selectedRegion} onChange={handleRegionChange}>
            <option  value="" disabled>Select a Region</option>  {/* Default placeholder */}
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
          
          {/* Optionally, display the selected region */}
          {selectedRegion && <p>Selected Region ID: {selectedRegion}</p>}
      </div>
    </>
  )
}

export default App