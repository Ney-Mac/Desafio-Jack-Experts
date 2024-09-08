import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import './input.scss';

type Props = {
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    label: string;
    error?: string;
}

export const Input = ({ label, labelProps, inputProps, error }: Props) => {
    return (
        <div className='input-container'>
            <label className='input-label' {...labelProps}>{label}</label>
            <input className='input'{...inputProps} />
            {error && <p className='input-error'>{error}</p>}
        </div>
    )
}