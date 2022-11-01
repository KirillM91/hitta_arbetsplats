export interface IJob {
    id: number,        
    headline: string,
    logo_url: string,
    description: {
        text: string
    },
    workplace_address: {
        municipality: string
    },
    publication_date: Date,
    webpage_url: string,
    employer: {
        name: string
    },
    occupation: {
        label: string
    },
    relevance:number
}