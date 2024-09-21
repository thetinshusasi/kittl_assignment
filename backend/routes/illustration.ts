import { getDbConnection } from "../database";
import { Router, Request, Response } from 'express';
import Illustration from "../models/Illustration";

let illustrationRouter = Router();

// Also Logger should be used to log the request and response and other detailas
// For the sake of simplicity, we are console logging the request and response


// We should seperate the route handlers into separate files as well . 
// However as it is instructed in the Readme.md file "Please try to keep the original structure and don't refactor code unless absolutely necessary."
// I am not doing it. . FYI : We should always think about the code readability , maintainability and Seperation of Concerns to tackle the code complexity.
illustrationRouter.get("/", async (req: Request, res: Response): Promise<Response<Illustration[] | string> | undefined> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const db = await getDbConnection();
        if (!db) {
            console.error("Database connection is not available.");
            return res.status(500).send("Internal server error");
        }

        const query = `SELECT * FROM illustrations LIMIT ?, ?;`;
        const illustrations = await db.all(query, [offset, limit]);
        return res.send(illustrations);
    } catch (err) {
        console.error("Error fetching illustrations:", err);
        return res.status(500).send("Internal server error");
    }
});

illustrationRouter.put("/:id/incrementUses", async (req: Request, res: Response): Promise<Response<Illustration | string> | undefined> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id) || id <= 0) { // Ensure id is positive
            return res.status(400).send("Invalid id");
        }

        const db = await getDbConnection();
        if (!db) {
            console.error("Database connection is not available.");
            return res.status(500).send("Internal server error");
        }

        await db.run("UPDATE illustrations SET uses = uses + 1 WHERE id = ?", [id]);

        const query = "SELECT * FROM illustrations WHERE id = ?";
        const illustration = await db.get(query, [id]);
    } catch (err) {
        console.error(`Error updating illustration with id ${req.params.id}:`, err);
        res.status(500).send("Internal server error");
    }
});

illustrationRouter.put("/incrementAllImpressions", async (req: Request, res: Response): Promise<Response<Illustration[] | string> | undefined> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const db = await getDbConnection();
        if (!db) {
            console.error("Database connection is not available.");
            return res.status(500).send("Internal server error");
        }

        await db.run("UPDATE illustrations SET impressions = impressions + 1");

        const query = "SELECT * FROM illustrations LIMIT ?, ?;";
        const illustrations = await db.all(query, [offset, limit]);
        res.send(illustrations);
    } catch (err) {
        console.error("Error updating all impressions:", err);
        res.status(500).send("Internal server error");
    }
});
export default illustrationRouter;