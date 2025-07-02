import { useForm, Controller, set } from "react-hook-form";
import { getUsers, type UserDto } from "../../services/repository.service";
import { useState } from "react";
import cn from "classnames";
import { Accordion, AccordionItem } from "../../components/Accordion";
import { ListRespository } from "../../pages/search-repository/components/ListRepository";
import { EmptyState } from "../../components/EmptyState";
import { Field } from "../../components/Field";
import { LoadingState } from "../../components/LoadingState";

interface SearchFormDto {
    username: string;
}

const SearchUserRepository = () => {
    const form = useForm<SearchFormDto>({
        defaultValues: {
            username: ''
        }
    })

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<UserDto[]>([]);

    const onSubmit = async (data: SearchFormDto) => {
        setUsers([]);
        setIsLoading(true);

        try {
            const users = await getUsers(data.username);
            setUsers(users.items);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching users:', error);
        }
    }

    return (
        <div>
            <div className="search-form">
                <div className="search-form--field">
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                            <Field
                                placeholder="Enter username"
                                value={field.value}
                                onChange={field.onChange}
                                onSubmit={form.handleSubmit(onSubmit)}
                                testId="search-username-field"
                            />
                        )}
                    />
                </div>

                <button
                    className="btn btn--primary"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isLoading}
                    data-testid="search-button"
                >
                    Search
                </button>
            </div>

            {isLoading && (
                <LoadingState />
            )}

            <div className={cn({
                'hidden': users.length === 0
            })}>
                <div className="search-result">
                    <p>Showing users for {form.watch('username')}</p>
                </div>

                <Accordion>
                    {users.map((user) => (
                        <AccordionItem key={user.id} header={user.login}>
                            <ListRespository user={user} />
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className={cn({
                'hidden': users.length > 0 || !form.formState.isSubmitted
            })}>
                <EmptyState message="No users found" />
            </div>
        </div>
    );
}

export default SearchUserRepository;