interface IconLoadingProps {
    className?: string;
}

export const IconLoading: React.FC<IconLoadingProps> = (props) => {
    const { className } = props;
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
}