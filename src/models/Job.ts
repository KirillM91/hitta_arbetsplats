export class Job {
    constructor(
        public id: number,
        public headline: string,
        public logo_url: string,
        public description: IText,
        public workplace_address: IMunicipality,
        public publication_date: Date,        
        public webpage_url: string,
        public employer: IEmployer,
        public occupation: IOcupation,
        public relevance: number        
    ){}
}

interface IText {
    text: string
}

interface IMunicipality {
    municipality: string
}

interface IEmployer {
    name: string
}

interface IOcupation {
    label: string
}