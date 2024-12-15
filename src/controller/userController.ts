import { Request, Response } from 'express';
import userService from '../services/userService';
import ID from '../models/ID';

const userController = {

    async getUserProfile(req: Request, res: Response) {
        // try {
        //     const { id } = req.params;
        //     const user = await userService.getUserProfile(id);
        //     res.json(user);
        // } catch (error: any) {
        //     res.status(404).json({ message: error.message });
        // }
    },

    async followUser(req: Request, res: Response) {
        // try {
        //     const { id } = req.params;
        //     await userService.followUser((req.user as any).id, ID.from(id));
        //     res.json({ message: 'User followed successfully' });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },

    async unfollowUser(req: Request, res: Response) {
        // try {
        //     const { id } = req.params;
        //     await userService.followUser((req.user as any).id, ID.from(id));
        //     res.json({ message: 'User unfollowed successfully' });
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },

    async getAllUsers(req: Request, res: Response) {
        // try {
        //     const users = await userService.getAllUsers();
        //     res.json(users);
        // } catch (error: any) {
        //     res.status(500).json({ message: error.message });
        // }
    },


    async updateUser(req: Request, res: Response) {

    },


    async deleteUser(req: Request, res: Response) {

    },

    async getUserById(req: Request, res: Response) {

    },

    async createUser(req: Request, res: Response) {

    },
};

export default userController;