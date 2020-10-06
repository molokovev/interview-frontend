import fetch from "isomorphic-unfetch";

export class FilesApi {
    static async getAllFiles(limit, offset) {
        const url = new URL("http://interview-api.snackable.ai/api/file/all");
        url.search = new URLSearchParams({
                limit: limit,
                offset: offset
            }
        ).toString();
        const files = await fetch(url.toString());
        return (await files).json();
    }
}
