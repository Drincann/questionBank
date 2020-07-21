module.exports = (req, res) => {
    try {
        // 用户
        if (!req.session.userInfo) {
            return res.send('window.isLogin = false;');
        }
        const user = req.session.userInfo;
        returnText = `
        window.user = {
            _id : '${user._id}',
            email : '${user.email}',
            username : '${user.username}',
            avatar : '${user.avatar && user.avatar.replace(/\\/g, '/')}',
            role : '${user.role}',
        };
        window.isLogin = true;
        `
        res.send(returnText);
    } catch (error) {
        res.status(500).send(`window.userError = ${error.message};`);
    }
};