import React from 'react'

interface Props extends React.HTMLAttributes<HTMLOrSVGScriptElement> {
    viewBox?: string,
    width?: number,
    height?: number,
    iconColor?: string,
    children: JSX.Element
}

const defaultProps: Props = {
    viewBox: '0 0 64 64',
    children: <></>,
    width: 18,
    height: 18,
    iconColor: 'currentColor'
}

const Icon: React.FC<Props> = ({ viewBox, width, height, iconColor, children }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={viewBox}
            role="presentation"
        >
            <g fill={iconColor}>
                {children}
            </g>
        </svg>
    )
}

Icon.defaultProps = defaultProps

export default Icon