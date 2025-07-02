interface FieldProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
    testId?: string;
}

export const Field: React.FC<FieldProps> = (props) => {
    const { placeholder, value, onChange, onSubmit } = props;

    return (
        <div className="field-input--container">
            <input
                className="field-input"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onSubmit) {
                        e.preventDefault();
                        onSubmit();
                    }
                }}
                data-testid={props.testId}
            />
        </div>
    );
}