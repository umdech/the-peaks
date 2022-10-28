type FieldProps = {
    thumbnail: string,
    trailText: string,
    body: string,
    main
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

type PostResponse = {
    status: string,
    message?: string,
    userTier?: string,
    content?: IPost
}