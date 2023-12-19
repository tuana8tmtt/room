import User from '../models/user'


export const userById = async (request, response, next, id) => {
    const user = await User.findById(id).exec();
    if (!user) {
        return response.status(400).json({
            message: "Khong tim thay user"
        })
    }
    request.profile = user;
    request.profile.password = undefined;

    next();
}
export const userDetail = async (request, response) => {
    try {
        const user = await User.findOne({ _id: request.params.id }).exec();
        request.profile = user;
        request.profile.password = undefined;
        response.json(user);
    } catch (error) {
        response.status(400).json({ message: "Không tìn thấy data" });
    }
};
export const updateUser = async (request, response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true }
        );
        return response
            .status(200)
            .json({ message: "Cập nhật thành công !", user: user });
    } catch (error) {
        response.status(400).json({ message: "Không thể sửa" });
    }
};
export const editPasswordUser = async (req, res, next) => {
    try {
        const { _id, password, oldPass } = req.body;

        const user = await User.findOne({ _id }).exec();
        if (!user) {
            return res.json({
                message: "Tài khoản hoặc mật khẩu không chính xác",
            });
        }
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        if (!user.authenticate(oldPass)) {
            throw new Error('Mật khẩu cũ không đúng');
        }

        user.password = password;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });

        const userNewPassword = await User.findOneAndUpdate(
            { _id: _id },
            { $set: { password: user.encryptPassword(password) } }, // Dữ liệu cập nhật
            { new: true }
        );

        res.json(userNewPassword);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // mã hóa pass
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(String(req.body.password), salt);

        const userNewPassword = await User.findOneAndUpdate(
            { email: email },
            { password: password },
            { new: true }
        );

        res.json(userNewPassword);
    } catch (error) {
        res.status(400).json({ message: "Lỗi rồi" });
    }
};