const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});


server.post('/login', (req, res) => {
    console.log(req.body);
    return res.json({name: 'asasas'});
});

server.post('/support', (req, res) => {
    console.log(req.body.message);
    return res.json({name: 'asasas'});
});

server.get('/users', (req, res) => {
    return res.json({
        filterTourneys: [
            {name: 'Баскетбол', value: 'basketbol'},
            {name: 'Футбол', value: 'footbol'},
            {name: 'Шахматы', value: 'chess'},
            {name: 'Волейбол', value: 'voleybol'},
            {name: 'Бег', value: 'run'},
            {name: 'Плавание', value: 'swim'},
            {name: 'Теннис', value: 'tennis'},
            {name: 'Гандбол', value: 'gandbol'},
        ],
        users: [
            {
                id: 1,
                name: "Смирнов Андрей Игоревич",
                title: {
                    city: 'Ярославль',
                    school: 'Школа№7',
                    classroom: '11б'
                },
                endTourneys: [
                    {name: 'Баскетбол', value: 'basketbol'},
                    {name: 'Футбол', value: 'footbol'},
                    {name: 'Шахматы', value: 'chess'},
                ],
                startTourneys: [
                    {name: 'Волейбол', value: 'voleybol'},
                    {name: 'Бег', value: 'run'},
                    {name: 'Плавание', value: 'swim'},
                    {name: 'Баскетбол', value: 'basketbol'},
                    {name: 'Футбол', value: 'footbol'},
                ]
            },
            {
                id: 2,
                name: "Викторов Андрей Максимович",
                title: {
                    city: 'Москва',
                    school: 'Школа№56',
                    classroom: '9ф'
                },
                endTourneys: [
                    {name: 'Шахматы', value: 'chess'},
                ],
                startTourneys: [
                    {name: 'Баскетбол', value: 'basketbol'},
                    {name: 'Футбол', value: 'footbol'},
                ]
            },
            {
                id: 12,
                name: "Балонов Максим Максимович",
                title: {
                    city: 'Самара',
                    school: 'Школа№20',
                    classroom: '10в'
                },
                endTourneys: [
                    {name: 'Баскетбол', value: 'basketbol'},
                    {name: 'Футбол', value: 'footbol'},
                    {name: 'Шахматы', value: 'chess'},
                    {name: 'Волейбол', value: 'voleybol'},
                    {name: 'Бег', value: 'run'},
                ],
                startTourneys: [
                    {name: 'Баскетбол', value: 'basketbol'},
                    {name: 'Футбол', value: 'footbol'},
                ]
            },
            {
                id: 3,
                name: "Балонов Максим Максимович",
                title: {
                    city: 'Санкт-Петербург',
                    school: 'Школа№120',
                    classroom: '11в'
                },
                endTourneys: [
                    {name: 'Баскетбол', value: 'basketbol'},
                    {name: 'Футбол', value: 'footbol'},
                    {name: 'Бег', value: 'run'},
                ],
                startTourneys: [
                    {name: 'Баскетбол', value: 'basketbol'},
                    {name: 'Футбол', value: 'footbol'},
                    {name: 'Шахматы', value: 'chess'},
                    {name: 'Волейбол', value: 'voleybol'},
                ]
            },
        ]
    });
});

server.put('/users', (req, res) => {
    console.log('edit')
    return res.status(200);
});

server.post('/users', (req, res) => {
    console.log('create')
    return res.status(200);
});

server.get('/upcoming-tourneys', (req, res) => {
    return res.json([
        {
            data: '24.02.2023',
            typeTourney: 'Открытый',
            participants: ['Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург'],
            countParticipants: 102,
        },
        {
            data: '24.02.2023',
            typeTourney: 'закрытый',
            participants: ['Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург'],
            countParticipants: 102,
        },
        {
            data: '24.02.2023',
            typeTourney: 'закрытый',
            participants: ['Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург'],
            countParticipants: 102,
        },
        {
            data: '24.02.2023',
            typeTourney: 'закрытый',
            participants: ['Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург'],
            countParticipants: 102,
        },
        {
            data: '24.02.2023',
            typeTourney: 'Открытый',
            participants: ['Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург'],
            countParticipants: 21,
        },
        {
            data: '24.02.2023',
            typeTourney: 'закрытый',
            participants: ['Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург'],
            countParticipants: 102,
        },
    ])
});

server.get('/home', (req, res) => {
    const participants = {
        completedTourney: 201,
        upcomingTourney: 41,
        upcomingTourneysArr: [
            {
                data: '24.02.2023',
                typeTourney: 'закрытый',
                participants: ['Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург'],
                countParticipants: 102,
            },
            {
                data: '24.02.2023',
                typeTourney: 'Открытый',
                participants: ['Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург', 'Самара', 'Москва', 'Тольятти', 'Ярославль', 'Санкт-Петербург'],
                countParticipants: 12,
            },
            {
                data: '24.02.2023',
                typeTourney: 'Открытый',
                participants: ['Самара', 'Москва', 'Тольятти'],
                countParticipants: 31,
            },
        ]
    };

    return res.json(participants);
});

// Эндпоинт для логина
// server.post('/login', (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
//         const { users = [] } = db;

//         const userFromBd = users.find(
//             (user) => user.username === username && user.password === password,
//         );

//         if (userFromBd) {
//             return res.json(userFromBd);
//         }

//         return res.status(403).json({ message: 'User not found' });
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ message: e.message });
//     }
// });

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
// server.use((req, res, next) => {
//     if (!req.headers.authorization) {
//         return res.status(403).json({ message: 'AUTH ERROR' });
//     }

//     next();
// });

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
