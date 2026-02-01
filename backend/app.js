const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const connectDb = require("./src/db/db");
const app = express();

app.use(cors({
     origin: 'http://localhost:5173', // Update with your frontend URL
}));
app.get('/', (req, res) => {
     res.send("server is running on port 3000.");
})
app.use(express.json());
app.use('/api/auth',authRoutes);
connectDb().then(() => {
     app.listen(3000, () => {
          console.log("server is running.");
     })
}).catch((err) => {
     console.log("failed to connect server.", err.message);

});