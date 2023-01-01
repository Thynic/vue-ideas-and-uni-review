const express = require("express");
const auth = require("../middleware/auth");
const knex = require("../db/knex");

const router = new express.Router();

router.get("/ideas", auth, async (req, res) => {
	const response = await knex("ideas")
		.select()
		.where({ owner: req.user.username });

	res.status(200).send(response);
});

router.post("/ideas", auth, async (req, res) => {
	console.log(req.user.username);
	try {
		await knex("ideas").insert({
			idea: req.body.idea,
			votes: 0,
			owner: req.user.username,
		});

		res.status(200).send("done");
	} catch (e) {
		res.status(500).send(e);
	}
});

router.patch("/ideas/:ideaId/vote", async (req, res) => {
	const { ideaId } = req.params;

	const response = await knex("ideas").select();
	const idea = response.find((idea) => idea.id == ideaId);

	await knex("ideas")
		.where({ id: ideaId })
		.update({
			votes: (idea.votes || 0) + 1,
		});

	const updatedResponse = await knex("ideas").select();
	const updatedIdea = updatedResponse.find((idea) => idea.id == ideaId);

	console.log("idea", updatedIdea);
	res.send(updatedIdea);
});

router.delete("/ideas/:ideaId/vote", async (req, res) => {
	const { ideaId } = req.params;

	const response = await knex("ideas").select();
	const idea = response.find((idea) => idea.id == ideaId);

	await knex("ideas")
		.where({ id: ideaId })
		.update({
			votes: (idea.votes || 0) - 1,
		});

	const updatedResponse = await knex("ideas").select();
	const updatedIdea = updatedResponse.find((idea) => idea.id == ideaId);

	console.log("idea", updatedIdea);
	res.send(updatedIdea);
});

router.delete("/ideas/:ideaId", async (req, res) => {
	const { ideaId } = req.params;

	const deletedResponse = await knex("ideas").select();
	const deletedIdea = deletedResponse.find((idea) => idea.id == ideaId);

	await knex("ideas").where({ id: ideaId }).del();

	res.status(200).send(deletedIdea);
});

module.exports = router;
