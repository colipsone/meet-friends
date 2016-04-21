/**
 * Created by colipsone on 4/3/2016.
 */
module.exports = function (app) {

    // create default user
    createDefaultUsers();

    function createDefaultUsers() {
        var User = app.models.user;
        var users = [
            {
                login: 'xim',
                photoUrl: '/containers/users-photos/download/UePbdph.jpg',
                username: 'xim',
                email: 'xim@rambler.ru',
                password: 'xim'
            },
            {
                login: 'colipso',
                photoUrl: '/containers/users-photos/download/UePbdph.jpg',
                username: 'colipso',
                email: 'colipsone@gmail.com',
                password: '111'
            },
            {
                login: 'yegor',
                photoUrl: '/containers/users-photos/download/UePbdph.jpg',
                username: 'yegor',
                email: 'yegor@gmail.com',
                password: '111'
            }
        ];
        users.forEach(function (user) {
            User.findOrCreate({where: { email: user.email }}, user, function(err, dbUser) {
                if (err) throw err;
                
            });
        });
    }
}
