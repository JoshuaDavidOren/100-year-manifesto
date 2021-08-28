const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const id = req.user.id;
  const qText = `
    SELECT * FROM "core_values" 
    WHERE "user_id" = $1;
    `;

  pool.query( qText, [id])
  .then((response) => { res.send(response.rows)
  })
  .catch((error) => {
    console.log("Error GETting coreValues", error);
    res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

/**
 * DELETE route template
 */
 router.delete('/', (req, res) => {
  // DELETE route code here
});

/**
 * PUT route template
 */
 router.put('/', (req, res) => {
  // PUT route code here
});



module.exports = router;