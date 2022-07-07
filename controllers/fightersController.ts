import { Request, Response } from "express";
import fighterService from "../services/fightersService.js";

export async function battleFighters(req: Request, res: Response) {
    const { firstFighter, secondFighter } = req.body;

    const result = await fighterService.battleFighters(
        firstFighter,
        secondFighter
    );
    return res.send(result);
}

export async function getRanking(req: Request, res: Response) {
    const ranking = await fighterService.getRanking();

    return res.send(ranking);
}
