import './smallButton.scss';

type Props = {
    onClick: () => void;
    children: React.ReactNode;
    type: 'error' | 'success';
}

export const SmallButton = ({ onClick, children, type }: Props) => {
    return (
        <button className={`btn ${type}`} onClick={onClick}>{children}</button>
    )
}