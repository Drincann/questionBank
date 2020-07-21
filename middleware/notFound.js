module.exports = (req, res) => {
    if (req.method == 'GET') {
        res.redirect('/404.html');
    } else {
        res.status(404).send({ message: 'Not found' });
    }

};