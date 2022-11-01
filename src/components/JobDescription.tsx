import axios from "axios";
import { useEffect, useState } from "react";
import { IJob } from "../models/IJob";
import { Job } from "../models/Job";
import downArrow  from "../assets/icons8-down-24.png";
import "./JobDescription.css";

//Typen "any" har används pga bristande kunskap inom TypeScript och inte pga lathet :)

export function JobDescription({searchParameters, muncipality}:any) {

    const [job, setJob] = useState<IJob[]>([]);


    // searchParameters innehåller sök kriterier
    let searchParametersURL = searchParameters.map((parameter:any) => {
        return(
            `?q='${parameter}'`
        )
    });    

    useEffect(() => { 
        
        async function getJobs() {
            try {
                await axios.get(`https://jobsearch.api.jobtechdev.se/search${searchParametersURL.join("")}?municipality=${muncipality}`)            
                
                .then((response) => { 
                        
                    let fetchedJobs = response.data.hits
                    //Sorterar efter datum, med senas datum först
                    .sort((a:any, b:any) => b.publication_date > a.publication_date)
                    .map((j: IJob) => {
                        return new Job(
                            j.id,
                            j.headline,
                            j.logo_url,
                            j.description,
                            j.workplace_address,
                            j.publication_date,
                            j.webpage_url,
                            j.employer,
                            j.occupation,
                            j.relevance
                        );
                    });
                    setJob(fetchedJobs);        
                });

            } catch (err) {
                console.log(err);            
            };
        }

        getJobs();

    }, [searchParameters, muncipality]);

    //Togglar visningen av brödtexten från annonsen samt vilket håll neråt pilen ska peka åt 
    function toggleText(e: any) {        
        e.currentTarget.previousSibling.classList.toggle('selected');        
        e.currentTarget.classList.toggle('selected-btn');
    };

    //Returnerar en färg, från en "röd till grön" gradient. Baserat på procent, från 0 till 100
    function hslColor(percent:any, start:any, end:any) {
        var a = percent / 100,
            b = (end - start) * a,
            c = b + start;     
        
        return "hsl("+c+", 100%, 50%)";
      }


    let displayedJobs = job.map((j: IJob, i:number) => {

        let date = new Date(j.publication_date);
        let formattedDate = date.toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        });    
        
        //.toFixed() - Hur många decimaler ska visas
        let percentage = (j.relevance * 100).toFixed(0)
        
        return(
            
            <div key = {j.id} className="job-container">

                <h2>{j.headline}</h2>

                <img src={j.logo_url} alt="" className="logo" />

                <article className="expanded-job-info">{j.description.text}</article>
                
                <img src={downArrow} alt="" onClick={toggleText} className="more-info-button"/>

                <div className="ad-details-info">
                    <p className="city">{j.employer.name} - {j.workplace_address.municipality}</p>                    
                    <p className="occupation">{j.occupation.label}</p>                    
                </div>

                <p className="publication-date">Publicerings datum: {formattedDate}</p> 

                <p className="relevance">Matchning:&nbsp;  
                    <span
                    style={{color: hslColor(percentage, 0, 130), fontWeight: 900}}
                    >
                        {percentage}%
                    </span>
                </p>

                <a href={j.webpage_url} target="_blank" rel="noopener noreferrer">
                    <p>Till annonsen</p>  
                    <div className="right-arrow"></div>
                </a>

            </div>
            
        )
    });

  

    return(
        <div className="job-description"> 
            {displayedJobs}           
        </div>
    )
}