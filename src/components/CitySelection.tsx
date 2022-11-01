import { useEffect, useState } from "react"
import "./CitySelection.css";

//Typen "any" har används pga bristande kunskap inom TypeScript och inte pga lathet :)

export function CitySelection({setMuncipality}: any) {

    const [selectedCity, setSelectedCity] = useState("")

    const cities = [
        "Hela Landet",
        "Stockholm",
        "Göteborg",
        "Malmö"
    ];

    //Muncipality - Kommunen/staden som sökord i fetchen
    //SelectedCity - Används för att "highlighta" vald stad

    useEffect(() => {
        setMuncipality("");
        setSelectedCity("Hela Landet")
    }, []);

    function changeCity(city:string) {
        setSelectedCity(city)
        if(city === "Hela Landet"){
            setMuncipality("");
        } else {
            setMuncipality(city);
        }
    }

    let mapedCities = cities.map((city:string, i:number) => {
        return(
            <li key={i} onClick={() => changeCity(city)} className={selectedCity === city ? "city-selected" : ""}>{city}</li>
        )
    });

    return(
        <div className="city-selection">
            <h1>Hitta arbetsplats</h1>
            <div className="list-of-cities-container">
                <p>ORT</p>
                <ul className="list-of-cities">
                    {mapedCities}
                </ul>
            </div>
        </div>
    )
}