import * as React from 'react';
import styled from 'styled-components';

// Define types for board item element properties
type ButtonProps = {
    variant: string,
    id: string,
    onClick: any
}

// Create button depending on range of situations based on variant

export const Button: React.FC<ButtonProps> = (props) => {
    const { id, onClick, variant } = props;
    const ButtonEl = styled.button<ButtonProps>`
        color:white;
        border: 0;
        padding:0;
        border-radius: 50%;    
        &:hover {
            cursor: pointer;
        }
    
        ${({ variant = '' }) => variant === 'add' && `
        width:32px;
        height:32px;
        background: linear-gradient(145deg, #5dffef, #4ee1c9);
        box-shadow:  1.5px 1.5px 2px #39a391,
                     -1.5px -1.5px 2px #75ffff;
         `}
        ${({ variant = '' }) => variant === 'confirm' && `
        width:24px;
        height:24px;
        background: linear-gradient(145deg, #27ff4c, #20dd40);
        box-shadow:  1.5px 1.5px 2px #179f2e,
                     -1.5px -1.5px 2px #31ff60;
        `} 
        ${({ variant = '' }) => variant === 'delete' && `
        width:24px;
        height:24px;
        background: linear-gradient(145deg, #e91818, #c41414);
        box-shadow:  1.5px 1.5px 2px #b71212,
                     -1.5px -1.5px 2px #fd1a1a;

        `}  
     `
    return (
        <ButtonEl id={id} onClick={onClick} variant={variant} type="button">
            {variant === 'add' && '╋'}
            {variant === 'confirm' && '✔'}
            {variant === 'delete' && '─'}
        </ButtonEl>
    );
};