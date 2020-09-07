const { Answers } = require('../../../model/Answers');
const { validateId } = require('../../../tools/tools');

module.exports = async (req, res) => {
    try {
        const _id = req.params['_id'];
        // 验证
        const { error } = validateId(_id, '用户 id 非法！');
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        // 该接口返回三种数据，1. 总浏览量  2. 总点赞数  3. 题解总数
        let views = 0, likes = 0, answersCount = 0;

        // 查询
        const answers = await
            Answers.find({ author: _id });

        // 计算数据
        {
            answersCount = answers.length;
            answers.forEach(element => {
                if (element && element.meta) {
                    views += element.meta.views;
                    likes += element.meta.likes;
                }
            });
        }

        // 返回数据
        res.send({
            views, likes, answersCount
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};