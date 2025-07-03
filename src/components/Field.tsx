interface FieldProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
    testId?: string;
    error?: boolean;
    helperText?: string;
}

export const Field: React.FC<FieldProps> = (props) => {
    const { placeholder, value, onChange, onSubmit, error, helperText } = props;

    return (
        <div>
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

            {error && (
                <div className="field-input--error" data-testid={`${props.testId}-error`}>
                    {helperText}
                </div>
            )}
        </div>
    );
}