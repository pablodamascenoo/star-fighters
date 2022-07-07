import axios, { AxiosResponse } from "axios";
import fightersRepository from "../repositories/fightersRepository.js";

async function battleFighters(firstFighter: string, secondFighter: string) {
    let firstFighterRepos: AxiosResponse;
    let secondFighterRepos: AxiosResponse;

    try {
        firstFighterRepos = await axios.get(
            `https://api.github.com/users/${firstFighter}/repos`
        );
        secondFighterRepos = await axios.get(
            `https://api.github.com/users/${secondFighter}/repos`
        );
    } catch (error) {
        throw { status: 404, message: "User not found", error };
    }

    let firstFighterStars = 0;
    let secondFighterStars = 0;
    firstFighterRepos.data.forEach(
        (repo: { stargazers_count: number }) =>
            (firstFighterStars += repo.stargazers_count)
    );
    secondFighterRepos.data.forEach(
        (repo: { stargazers_count: number }) =>
            (secondFighterStars += repo.stargazers_count)
    );

    if (firstFighterStars > secondFighterStars) {
        await fightersRepository.updateFighter(
            firstFighter,
            true,
            false,
            false
        );
        await fightersRepository.updateFighter(
            secondFighter,
            false,
            true,
            false
        );
        return {
            winner: firstFighter,
            loser: secondFighter,
            draw: false,
        };
    } else if (firstFighterStars < secondFighterStars) {
        await fightersRepository.updateFighter(
            firstFighter,
            false,
            true,
            false
        );
        await fightersRepository.updateFighter(
            secondFighter,
            true,
            false,
            false
        );
        return {
            winner: secondFighter,
            loser: firstFighter,
            draw: false,
        };
    } else {
        await fightersRepository.updateFighter(
            firstFighter,
            false,
            false,
            true
        );
        await fightersRepository.updateFighter(
            secondFighter,
            false,
            false,
            true
        );
        return {
            winner: null,
            loser: null,
            draw: true,
        };
    }
}

async function getRanking() {
    const fighters = await fightersRepository.getRanking();

    return {
        fighters: fighters.map((fighter) => {
            delete fighter.id;

            return fighter;
        }),
    };
}

const fighterService = {
    battleFighters,
    getRanking,
};

export default fighterService;
