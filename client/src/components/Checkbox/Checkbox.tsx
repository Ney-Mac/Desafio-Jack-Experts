import './checkbox.scss';

type Props = {
    text: string;
    isChecked: boolean;
    onClick: () => void;
    id: string;
}

export const Checkbox = ({ text, isChecked, onClick, id }: Props) => {
    return (
        <div className="checkbox-container">
            <input
                id={id}
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={onClick}
            />
            <label
                htmlFor={id}
                className="checkbox-label"
            >
                {text}
            </label>
        </div>
    )
}