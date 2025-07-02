interface LoadingStateProps {
    testId?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = (props) => {
    const { testId } = props;

    return (
        <div className="loading-state" data-testid={testId}>
            <svg className="loading-state--icon lucide lucide-loader-circle-icon lucide-loader-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
        </div>
    )
}