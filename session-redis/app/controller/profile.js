const profileService = require('../service/profile');

async function profileController(req, res) {
    const user = await profileService.getProfile();
    res.json(user);
    res.end();
}
module.exports = profileController;