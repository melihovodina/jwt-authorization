import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import uuid from 'uuid';
import mailService from "./mailService";

class UserService {
    async registration(email: string, password: string) {
        const candidate = await userModel.findOne({ email });
        if(candidate) {
            throw new Error(`${email} is already registered`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();
        const user = await userModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink);
    }
}

export default new UserService();