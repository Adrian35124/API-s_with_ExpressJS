const express = require("express")
const chirpStore = require("../../chirpstore")
const router = express.Router();

router.get("/", (req, res) => {
    res.send(chirpStore.GetChirps())
});

router.get("/:id", (req, res) => {
    res.send(chirpStore.GetChirp(req.params.id));
});

router.post("/", (req, res) => {
    let chirpObj = {
        user: req.body.user,
        text: req.body.text
    };
    chirpStore.CreateChirp(chirpObj);

    res.sendStatus(200);
});

router.put("/:id", (req, res) => {
    let chirpObj = {
        user: req.body.user,
        text: req.body.text
    };
    chirpStore.UpdateChirp(req.params.id, chirpObj);

    res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
    chirpStore.DeleteChirp(req.params.id);

    res.send(`chirp ${req.params.id} was deleted`); 
});

module.exports = router;
