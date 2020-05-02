import apiClient from './ApiConfig'

interface Image {
    deployment: string
}

export default {
    getAll(skip: number, take: number) {
        return apiClient.get(
            '/image',
            { params: { skip, take } }
        )
    },
    getById(id: number) {
        return apiClient.get(
            '/image',
            { params: { id } }
        )
    },
    post(image: Image, username: string, password: string) {
        return apiClient.post(
            '/create',
            { image },
            { headers: { username, password } }
        )
    },
}