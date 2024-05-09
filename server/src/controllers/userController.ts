import express from 'express'; 
import userService from '../service/userService';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/apiErrors';

class UserController {
    async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24* 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async activate(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            res.json(['123', '456'])
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();