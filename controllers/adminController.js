

exports.renderAdminPage = async (req, res) => {
	try {
		res.render('account');
	} catch (error) {
		console.error('Error showing account:', error);
		res.status(500).send('Internal Server Error');
	}
};
