interface EmptyStateProps {
    message?: string;
    testId?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = (props) => {
    const { message = 'No data available', testId } = props;

    return (
        <div className="empty-state" data-testid={testId}>
            <p className="empty-state--title">{message}</p>
        </div>
    );
}
