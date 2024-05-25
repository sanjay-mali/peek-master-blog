import { Client, Account, ID } from 'appwrite'
import config from '../config/config';

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                return this.Login({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async Login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async Logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw new Error(`Failed to get current user: ${error.message}`);
        }
    }
}

const authService = new AuthService()

export default authService