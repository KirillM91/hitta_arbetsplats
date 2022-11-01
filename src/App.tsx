import { useState } from 'react';
import './App.css';
import { CitySelection } from './components/CitySelection';
import { JobDescription } from './components/JobDescription';
import { SearchParameters } from './components/SearchParameters';

function App() {

  const [searchParameters, setSearchParameters] = useState([]);
  const [muncipality, setMuncipality] = useState("");  
  
  return (
    <div className="App">
        <CitySelection setMuncipality={setMuncipality}></CitySelection>
        <SearchParameters searchParameters={searchParameters} setSearchParameters={setSearchParameters} />
        <JobDescription searchParameters={searchParameters} muncipality={muncipality}/>
        <footer>A school project at Medieinstitutet made by Kirill Missarov</footer>
    </div>
  );
}

export default App;
