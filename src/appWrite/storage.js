import { Client, ID, Storage, Query, Databases } from 'appwrite'
import config from '../config/config.js'

export class StorageService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, content, slug, image, status, userid }) {
        try {
            const response = await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid,
                }
            )
            console.log("response " + response)
            console.log("User id - " + userid)
            return response
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries
            )
        } catch (error) {
            throw error
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(fileId)
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error.message)
        }
    }

}

const storage = new StorageService()
export default storage