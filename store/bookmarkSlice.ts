import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState: BookmarkState = {
    items: []
} as const

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        setBookmarks: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.items>
        ) => {
            state.items = action.payload
        },
        addBookmark: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.items>
        ) => {
            if (state.items.indexOf(action.payload) !== 0) {
                if (state.items.indexOf(action.payload) === -1) {
                    state.items.push(action.payload)
                }
            }
        },
        removeBookmark: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.items>
        ) => {
            const index = state.items.indexOf(action.payload)
            if (index > -1) {
                state.items.splice(index, 1)
            }
        },
    }
})

export const getBookmarksState = (state: { items: BookmarkState }) => state.items

export const { setBookmarks, addBookmark, removeBookmark } = bookmarkSlice.actions

export default bookmarkSlice.reducer