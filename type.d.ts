type FieldProps = {
    thumbnail: string,
    trailText: string,
    body: string,
    headline: string,
    main: string
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

interface IBookmark {
    ids: string
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

type BookmarkAction = {
    type: string,
    id: string
}

type BookmarkState = {
    items: any
}

type BookmarkDispatchType = (args: BookmarkAction) => BookmarkAction