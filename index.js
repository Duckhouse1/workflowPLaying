const express = require('express');
const app = express();
const port = 3000;
const notifier = require('node-notifier');
const axios = require('axios');

// Middleware to parse JSON payload
app.use(express.json());

app.post('/', async (req, res) => {
      console.log('Webhook payload:', JSON.stringify(req.body, null, 2));


  if (req.body.event === 'taskCreated' && req.body.task_id) {
    try {
      // Fetch task details from ClickUp API
      const response = await axios.get(`https://api.clickup.com/api/v2/task/${req.body.task_id}`, {
        headers: {
          Authorization: 'pk_206646337_GRJWRC98L4IVB073YAFRNJHIMPFV2QGR'
        }
      });
      
      const task = response.data;

      notifier.notify({
        title: 'ClickUp',
        message: `Task created: ${task.name}`
      });
      console.log('Task created:', task.name);
    } catch (error) {
      console.error('Error fetching task details: blbla', error.message);
    }
  }

  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Webhook server listening at http://localhost:${port}`);
});
