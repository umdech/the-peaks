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

interface ISection {
    id: string,
    webTitle: string,
    webUrl: string,
    apiUrl: string,
    editions?: any
}

type PostResponse = {
    status: string,
    message?: string,
    userTier?: string,
    content?: IPost
}

type SectionReponse = {
    status: string,
    message?: string,
    userTier?: string,
    total?: number,
    startIndex?: number,
    pageSize?: number,
    currentPage?: number,
    pages?: number,
    orderBy?: string,
    edition?: any,
    section: ISection,
    results: IPost[]
}

type SearchResponse = {
    status: string,
    message?: string,
    userTier?: string,
    total?: number,
    startIndex?: number,
    pageSize?: number,
    currentPage?: number,
    pages?: number,
    orderBy?: string,
    results: IPost[]
}

type SelectProps = {
    label: string,
    value: OrderByProps
}

type OrderByProps = 'newest' | 'oldest' | 'relevance'