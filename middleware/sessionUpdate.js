const { Users } = require('../model/Users');

module.exports = async (req, res, next) => {
    try {
        // 更新 session，若验证不通过则删除登陆状态
        if (req.session.userInfo) {
            // 取出哈希密码和邮箱
            const { password: hashPassword, email } = req.session.userInfo;
            // 密码验证
            const user = await Users.findOne({ email })
            if (!(user && user.password == hashPassword)) {
                // 不通过
                req.session.userInfo = undefined;
            }
        } else {
            req.session.userInfo = undefined;
        }
        next();
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}