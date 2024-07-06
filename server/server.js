const cors =require('cors');
const express = require('express');
const oracledb =require('oracledb');
const bcrypt =require('bcryptjs');
const session=require('express-session');
const RedisStore =require('connect-redis').default;
const Redis=require('ioredis');

const app = express();
const PORT = 5000;

const redisClient = new Redis();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.use(cors());  // CORS 미들웨어 사용
app.use(express.json());


app.use(session({
    store: new RedisStore({client : redisClient}),
    secret: '나중에 채워야할곳',
    resave: false,
    saveUninitialized:false,
    cookie:{secure:false} //https 사용시 true로 하세요 지훈님-까먹지마세요
}));

async function getOracleConnection(){
    try {
        return await oracledb.getConnection({
            user: 'new_user',
            password: '12345',
            connectString: 'localhost/xe'
        });
    }catch(err){
        console.error(err);
    }
}


app.post('/register', async (req, res) => {
    const { username, password, email, phone_number, preference } = req.body;

    if (!username || !password || !phone_number) {
        return res.status(400).send('Username, password, and phone number are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let connection;
    try {
        connection = await getOracleConnection();

        const result = await connection.execute(
            `INSERT INTO users (user_id, username, password, email, phone_number, preference) VALUES (user_seq.NEXTVAL, :username, :password, :email, :phone_number, :preference)`,
            { username, password: hashedPassword, email, phone_number, preference },
            { autoCommit: true }
        );

        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    let connection;
    try {
        connection = await getOracleConnection();

        const result = await connection.execute(
            `SELECT * FROM users WHERE username = :username`,
            { username }
        );

        if (result.rows.length === 0) {
            return res.status(400).send('Invalid credentials');
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.PASSWORD);

        if (!passwordMatch) {
            return res.status(400).send('Invalid credentials');
        }

        req.session.userId = user.USER_ID;
        res.send('Login successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

function authenticateSession(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

app.get('/protected', authenticateSession, (req, res) => {
    res.send('This is a protected route');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
