import { addToBookmark, getAllBookmarks, removeFromBookmark } from '@/libs/bookmark'
import { darken, lighten } from 'polished'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'store'
import { addBookmark, getBookmarksState, removeBookmark, setBookmarks } from 'store/bookmarkSlice'
import styled from 'styled-components'
import Icon from './icon'
import Bookmark from './icon/bookmark'
import BookmarkOutline from './icon/bookmark-outline'

type Props = {
    id: string
}

type ToastType = '' | 'add' | 'remove'

type ToastProps = {
    type: ToastType,
    animated: boolean
}

const Button = styled.button`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primaryColor};
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    display: inline-flex;
    font-family: ${({ theme }) => theme.fonts.familyBody};
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 1rem;
    padding: 0.469rem 0.8rem;
    text-transform: uppercase;
    transition: all .3s ease-in-out;
    span {
        margin-left: 0.5rem;
    }
    &:hover {
        background-color: ${({ theme }) => lighten(0.1, theme.colors.primaryColor)};
    }
    &:active {
        background-color: ${({ theme }) => darken(0.05, theme.colors.primaryColor)};
    }
    &[disabled] {
        opacity: 0.65;
        pointer-events: none;
    }
`

const Toast = styled.div<ToastProps>`
    align-items: center;
    background-color: ${({ type, theme }) => type === 'add' ? theme.colors.green : theme.colors.red};
    bottom: 0;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    left: 0;
    padding: 0.4rem 0;
    position: fixed;
    right: 0;
    text-align: center;
    text-transform: uppercase;
    transform: translateY(${({ animated }) => animated ? '0' : '100%'});
    z-index: 1000;
    transition: all .3s cubic-bezier(0.22, 0.61, 0.36, 1);
    span {
        margin-left: 1rem
    }
`

const BookmarkBtn = ({ id }: Props) => {
    const dispatch = useDispatch()
    const bookmarks = useSelector(getBookmarksState)
    let isBookmark: boolean = false
    if (bookmarks.items.find((x: string) => x === id)) {
        isBookmark = true
    }

    const [isToastOpened, setIsToastOpened] = useState(false)
    const [msg, setMsg] = useState<ToastType>('')
    const [animated, setAnimated] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let msg: ToastType
        setDisabled(true)
        if (!isBookmark) {
            dispatch(addBookmark(id))
            addToBookmark(id)
            msg = 'add'
        } else {
            dispatch(removeBookmark(id))
            removeFromBookmark(id)
            msg = 'remove'
        }
        setMsg(msg)
        setIsToastOpened(true)
        setTimeout(() => {
            setAnimated(true)
        }, 100)
        setTimeout(() => {
            deleteToast()
            setDisabled(false)
        }, 2500)
    }

    const deleteToast = () => {
        setAnimated(false)
        setTimeout(() => {
            setMsg('')
            setIsToastOpened(false)
        }, 500)
    }
    useEffect(
        () => {
            if (!bookmarks.items.length) {
                const bms = getAllBookmarks()
                if (!bms.length) {
                    return
                }
                dispatch(setBookmarks(getAllBookmarks()))
            }
        }, [bookmarks, dispatch]
    )
    return (
        <>
            <Button type="button" onClick={handleBookmark} disabled={disabled}>
                <Icon width={14} height={14}>
                    <Bookmark />
                </Icon>
                <span>{(!isBookmark) ? 'Add bookmark' : 'Remove bookmark'}</span>
            </Button>
            {isToastOpened && (
                <Toast type={msg} animated={animated}>
                    <Icon width={14} height={14}>
                        {msg === 'add' ? <Bookmark /> : <BookmarkOutline />}
                    </Icon>
                    <span>{msg === 'add' ? 'Save to bookmarks' : 'Remove from bookmarks'}</span>
                </Toast>
            )}
        </>
    )
}

export default BookmarkBtn