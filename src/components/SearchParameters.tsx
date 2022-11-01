import { ChangeEvent, useEffect, useState } from "react";
import "./SearchParameters.css";

//Typen "any" har används pga bristande kunskap inom TypeScript och inte pga lathet :)

export function SearchParameters({searchParameters, setSearchParameters}: any) {

    const [newSearchParameter, setNewSearchParameter] = useState("");

    useEffect(() => {
        setSearchParameters([
            "frontend", 
            "node", 
            "react", 
            "typescript", 
            "javascript"
        ])        
    }, []);


    //Tar bort sökordet man klickar på från searchParameters och med det från att den visas på sidan 
    function removeParameter(iToRemove:number) {
        setSearchParameters((current:string[]) =>
          current.filter((any:any, i:number) => i !== iToRemove)
        );        
    };

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setNewSearchParameter(event.target.value);
    };

    function addNewSearchParameter() {

        if(newSearchParameter !== ""){
            setSearchParameters((searchParameters: string[]) => [...searchParameters, newSearchParameter]);
            setNewSearchParameter("");
        } else {
            alert("Vänligen fyll i fältet")
        }        
    };

    let displayedSearchParameters = searchParameters.map((p: string, i:number) => {
        return(
            <div 
            key={i} 
            className="search-parameter-bubble"
            onClick={() => removeParameter(i)}
            >
                {p}
            </div>
        )
    });

    return(
        <div className="search-parameters">
            <p>SÖKORD</p>
            <div className="search-parameter-bubble-container">
                
                {displayedSearchParameters}            
            </div>
            <p className="add-new-searchword">LÄGG TILL SÖKORD</p>
            <div className="search-button">
                <input value={newSearchParameter} onChange={handleChange}></input>
                <div className="new-search-parameter" onClick={addNewSearchParameter}>+</div>                  
            </div>     
        </div>
    )
}