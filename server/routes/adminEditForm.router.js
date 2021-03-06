const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route for admin_edit_form table
 */
router.get("/:page_id", (req, res) => {
  // group by page_id and html_id
  // get the most recent row from each group
  // then grab only the values for the current page_id
  const getQueryText = `
    WITH "page_data" AS (
      SELECT "id", 
            "user_id", 
            "page_id",
            "page_name",
            "html_id",
            "html_type",
            "html_content",
            "edit_date",
            ROW_NUMBER() OVER(PARTITION BY "page_id", "html_id", "html_type"
                                  ORDER BY "edit_date" DESC) AS "rank"
        FROM "admin_edit_form")
    SELECT *
      FROM "page_data"
    WHERE "rank" = 1 AND "page_id" = $1;
  `;

  pool
    .query(getQueryText, [req.params.page_id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("GET admin_edit_form table failed: ", err);
      res.sendStatus(500);
    });
});

/**
 * GET route for admin_edit_form table
 * returns single row showing what an html element looked like at a specific date and time
 */
router.get("/edit_on_date/:page_id", rejectUnauthenticated, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "superadmin") {
    const edit_date = decodeURIComponent(req.query.edit_date);
    const html_id = decodeURIComponent(req.query.html_id);

    // filter out results that are more recent than req.body.edit_date
    // group by page_id and html_id
    // get the most recent row from each group
    // then grab only the values for the current page_id and html_id
    const getQueryText = `
      WITH "page_data" AS (
        SELECT "id", 
              "user_id", 
              "page_id",
              "page_name",
              "html_id",
              "html_type",
              "html_content",
              "edit_date",
              ROW_NUMBER() OVER(PARTITION BY "page_id", "html_id", "html_type"
                                    ORDER BY "edit_date" DESC) AS "rank"
          FROM "admin_edit_form"
          WHERE "edit_date" <  $1)
      SELECT *
        FROM "page_data"
      WHERE "rank" = 1 AND "page_id" = $2 AND "html_id" = $3;
    `;

    pool
      .query(getQueryText, [edit_date, req.params.page_id, html_id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.log("GET edit_on_date failed: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("GET edit_on_date permission denied: ", err);
    res.sendStatus(403);
  }
});

/**
 * POST route for admin_edit_form table
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "superadmin") {
    const postQueryText = `
      INSERT INTO "admin_edit_form" ("user_id", "page_id", "page_name", "html_id", "html_type", "html_content")
      VALUES ($1, $2, $3, $4, $5, $6);
    `;

    pool
      .query(postQueryText, [
        req.user.id,
        req.body.page_id,
        req.body.page_name,
        req.body.html_id,
        req.body.html_type,
        req.body.html_content,
      ])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.log("POST admin_edit_form table failed: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("POST admin_edit_form permission denied: ", err);
    res.sendStatus(403);
  }
});

/**
 * DELETE route for admin_edit_form table
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "superadmin") {
    const deleteQueryText = `
      DELETE FROM "admin_edit_form"
      WHERE "id" = $1;
    `;

    pool
      .query(deleteQueryText, [req.params.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.log("DELETE admin_edit_form table failed: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("DELETE admin_edit_form permission denied: ", err);
    res.sendStatus(403);
  }
});

module.exports = router;
