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
    async createPost({ title, content, slug, image, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                {
                    title,
                    content,
                    slug,
                    image,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
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
            throw error
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
            return await this.database.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
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
            return await this.storage.createFile(file)
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

    async getFilePreview(fileId) {
        try {
            return await this.storage.getFilePreview(fileId)
        } catch (error) {
            throw error
        }
    }

}

const storage = new StorageService()
export default storage