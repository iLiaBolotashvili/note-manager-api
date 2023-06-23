const controller = require("../controllers/note");
const db = require("../models");

module.exports = function(server) {
    server.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    server.post('/api/notes/post/:userId', async (req, res) => {
        const { userId } = req.params; 
        const { title, content } = req.body; 
      
        try {
          const user = await db.user.findOne({ where: { id: userId } });
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          const note = await db.note.create({ title, content, userId: userId });
      
          return res.status(201).json(note); // Return the newly created note
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Server error' });
        }
      });
  
      server.get('/api/notes/get/:userId', async (req, res) => {

        const { userId } = req.params; 

        try {
          const user = await db.user.findByPk(userId, {
            include: { model: db.note, as: 'notes' },
          });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          return res.status(200).json(user.notes); // Return the notes associated with the user
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Server error' });
        }

      });
  };