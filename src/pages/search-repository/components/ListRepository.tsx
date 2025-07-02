import { useEffect, useState } from "react";
import { useAccordion } from "../../../hooks/useAccordion";
import { getUserRepositories, type GetUserRepositoriesResponse, type UserDto } from "../../../services/repository.service";
import { LoadingState } from "../../../components/LoadingState";
import { EmptyState } from "../../../components/EmptyState";
import cn from "classnames";
import { IconLoading } from "../../../components/IconLoading";

interface ListRespositoryProps {
    user: UserDto
}

export const ListRespository: React.FC<ListRespositoryProps> = (props) => {
    const { user } = props

    const accordion = useAccordion()

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [repositories, setRepositories] = useState<GetUserRepositoriesResponse | null>(null);

    useEffect(() => {
        if (!isLoading && accordion.isOpen) {
            getUserRepository(user.login)
        }
    }, [accordion.isOpen])

    const getUserRepository = async (username: string, page?: number) => {
        if (!page) setIsLoading(true);

        try {
            const repositories = await getUserRepositories(username, page || 1);
            if (!page) setIsLoading(false);

            if (repositories.total_count === 0) {
                setRepositories(null);
                return;
            }

            if (page && page > 1) {
                setRepositories((prev) => ({
                    ...repositories,
                    items: [...(prev?.items || []), ...repositories.items]
                }));
                return;
            }

            setRepositories(repositories);
        } catch (error) {
            if (!page) setIsLoading(false);
            console.error('Error fetching user repositories:', error);
            throw error;
        }
    }

    const loadMore = async () => {
        setIsLoadingMore(true);
        try {
            const nextPage = page + 1;
            await getUserRepository(user.login, nextPage);
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more repositories:', error);
        } finally {
            setIsLoadingMore(false);
        }
    }

    return (
        <div>
            {isLoading && <LoadingState />}
            {!isLoading && !repositories && <EmptyState message="No repositories found for this user" />}
            {!isLoading && repositories && repositories?.total_count !== 0 && (
                <div className="repository-list">
                    {repositories.items.map((repo) => (
                        <div className="repository-item" key={repo.id}>
                            <div className="repository-item--header">
                                <p className="repository-item--header--title">
                                    {repo.name}
                                </p>

                                <div className="repository-item--header--star">
                                    <p className="repository-item--header-star-count">
                                        {repo.stargazers_count}
                                    </p>
                                    <svg className="repository-item--header--icon lucide lucide-star-icon lucide-star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                                </div>
                            </div>

                            <div className="repository-item--description">
                                <p className="repository-item--description--text">
                                    {repo.description || "No description available"}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className={cn({ 'hidden': repositories.total_count <= 5 })}>
                        <button className="repository-item--load-more" onClick={loadMore}>
                            {isLoadingMore ? <IconLoading className="icon icon--loading" /> : "Load More"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}