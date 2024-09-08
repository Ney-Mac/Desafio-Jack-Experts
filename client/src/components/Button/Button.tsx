import './button.scss';

type Props = {
    type?: 'submit' | 'button';
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ children, onClick, type = 'button' }: Props) => {
    return (
        <button className='button' onClick={onClick} type={type}>
            {children}
        </button>
    )
}