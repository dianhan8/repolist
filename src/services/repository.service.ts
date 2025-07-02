import axios from 'axios'

interface GetUsersResponse {
    total_count: number;
    incomplete_results: boolean;
    items: UserDto[];
}

export interface UserDto {
    id: number;
    login: string;
}

export interface UserRepositoryDto {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
}

export interface GetUserRepositoriesResponse {
    total_count: number;
    items: UserRepositoryDto[];
}

export const getUsers = async (username: string): Promise<GetUsersResponse> => {
    try {
        const response = await axios.get(`https://api.github.com/search/users`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            },
            params: {
                q: username,
                per_page: 5
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user repositories:', error);
        throw error;
    }
}

export const getUserRepositories = async (username: string, page: number): Promise<GetUserRepositoriesResponse> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            },
            params: {
                per_page: 5,
                page
            }
        });

        const linkHeader = response.headers.link || "";
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        const totalPages = match ? parseInt(match[1], 10) : 0;

        return {
            total_count: totalPages,
            items: response.data
        };
    } catch (error) {
        console.error('Error fetching user repositories:', error);
        throw error;
    }
}