import { Request, Response } from 'express';
import userService from '../services/userService';
import ID from '../models/ID';

const userController = {
    async registerUser(req: Request, res: Response) {
        try {
            const { email, password, nickname, role } = req.body;
            const result = await userService.registerUser(email, password, nickname, role);
            res.status(201).json({ message: 'User registered successfully', result });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await userService.loginUser(email, password);
            res.json({ token });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    },

    async getUserProfile(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getUserProfile(id);
            res.json(user);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    },

    // async followUser(req: Request, res: Response) {
    //     try {
    //         const { id } = req.params;
    //         await userService.followUser((req.user as any).id, ID.from(id));
    //         res.json({ message: 'User followed successfully' });
    //     } catch (error: any) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    // async unfollowUser(req: Request, res: Response) {
    //     try {
    //         const { id } = req.params;
    //         await userService.followUser((req.user as any).id, ID.from(id));
    //         res.json({ message: 'User unfollowed successfully' });
    //     } catch (error: any) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }
};

export default userController;