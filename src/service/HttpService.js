export default class HttpService {
    static BASE_URL = "http://localhost:8080";

    static get(endpoint, options = {}) {
        return fetch(`${HttpService.BASE_URL}/api/${endpoint}`).then(res => res.json())
    }

    static post(endpoint, body) {
        return fetch(`${HttpService.BASE_URL}/api/${endpoint}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            }
        ).then(res => res.json())
    }

}
