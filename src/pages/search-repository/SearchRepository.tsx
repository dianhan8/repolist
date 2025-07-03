import { useForm, Controller } from "react-hook-form";
import { getUsers, type UserDto } from "../../services/repository.service";
import { useState } from "react";
import cn from "classnames";
import { Accordion, AccordionItem } from "../../components/Accordion";
import { ListRespository } from "../../pages/search-repository/components/ListRepository";
import { EmptyState } from "../../components/EmptyState";
import { Field } from "../../components/Field";
import { LoadingState } from "../../components/LoadingState";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface SearchFormDto {
    username: string;
}

const SearchUserRepository = () => {
    const form = useForm<SearchFormDto>({
        defaultValues: {
            username: ''
        },
        resolver: yupResolver(yup.object().shape({
            username: yup.string().required('Username is required')
        }))
    })

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState<UserDto[]>([]);

    const onSubmit = async (data: SearchFormDto) => {
        setUsers([]);
        setIsLoading(true);
        setUsername(data.username);

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
        <div className="search-repository">
            <div className="search-form">
                <div className="search-form--field">
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, formState: { errors } }) => (
                            <Field
                                placeholder="Enter username"
                                value={field.value}
                                onChange={field.onChange}
                                onSubmit={form.handleSubmit(onSubmit)}
                                testId="search-username-field"
                                error={Boolean(errors[field.name]?.message)}
                                helperText={errors[field.name]?.message}
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

            <div className={cn("search-result--container", {
                'hidden': users.length === 0
            })}>
                <div className="search-result">
                    <p data-testid="show-result--word">Showing users for {username}</p>
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