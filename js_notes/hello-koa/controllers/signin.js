/*
@author: magician
@file:   signin.js
@date:   2020/2/14
*/
'use strict';

// module.exports = {
//     'POST /signin': async (ctx, next) => {
//         let
//             email = ctx.request.body.email || '',
//             password = ctx.request.body.password || '';
//
//         if (email === 'admin@example.com' && password === '123456') {
//             console.log('signin ok!');
//             ctx.render('signin-ok.html', {
//                 title: 'Sign In Ok',
//                 name: 'Mr Node'
//             });
//         } else {
//             console.log('signin failed!');
//             ctx.render('signin-failed.html', {
//                 title: 'Sign In Failed'
//             });
//         }
//     }
// };

let index = 0;

module.exports = {
    'GET /signin': async (ctx, next) => {
        let names = '甲乙丙丁戊己庚辛壬癸';
        let name = names[index % 10];

        ctx.render('signin.html', {
            name: `路人${name}`
        });
    },

    'POST /signin': async (ctx, next) => {
        index++;
        let name = ctx.request.body.name || '路人甲';
        let user = {
            id: index,
            name: name,
            image: index % 10
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');

        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
        ctx.response.redirect('/');
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};
