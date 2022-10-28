type FieldProps = {
    thumbnail: string,
    trailText: string
}

interface IPost {
    id: string,
    type: string,
    sectionId: string,
    sectionName: string,
    webPublicationDate: string,
    webTitle: string,
    webUrl: string,
    apiUrl: string,
    fields?: FieldProps,
    isHosted: boolean,
    pillarId: string,
    pillarName: string
}