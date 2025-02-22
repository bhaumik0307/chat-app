const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const messageRoutes = require('./routes/messageRoute');
const { connectDB } = require('./lib/db');
const { app, server, io } = require('./lib/socket');
const path = require('path');


dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));


    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectDB();
});