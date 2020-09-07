const { AnswersWhoLikes } = require('../../../model/AnswersWhoLikes');
const { Answers } = require('../../../model/Answers');
const { validateId } = require('../../../tools/tools');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    try {
        // 获取参数 题解 id
        const _id = req.params['_id'];
        const userId = req.session.userInfo._id;

        // 验证 id
        const { error } = validateId(_id, '题解 id 格式非法！');
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        // 查询题目
        let answer = await Answers.findOne({ _id });
        if (!answer) {
            return res.status(400).send({ message: '未找到欲点赞的题解！' });
        }

        // 判断是否点过赞
        isFound = await AnswersWhoLikes.findOne({ answer: _id, users: { $in: userId } });
        if (!!isFound) {
            return res.status(400).send({ message: '您已经点过赞了！' });
        }

        // 修改
        // 题目 who like 添加用户
        let aWhoLike = await AnswersWhoLikes.findOne({ answer: _id });
        // 增加健壮性，考虑 post 题目时未成功创建 whoLike 表
        if (!aWhoLike) {
            // 未找到则创建
            aWhoLike = await AnswersWhoLikes.create({ answer: _id });
        }
        aWhoLike.users.push(userId); await aWhoLike.save();


        // 同步点赞数
        answer.meta.likes = (await AnswersWhoLikes.aggregate(
            [{
                $match: {
                    answer: mongoose.Types.ObjectId(_id)
                }
            }, {
                $project: {
                    users: {
                        $size: '$users'
                    }
                }
            }]).exec())[0].users; answer.save();



        res.send({ likes: answer.meta.likes });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
};