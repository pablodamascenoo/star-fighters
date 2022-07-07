import db from "../src/db.js";

async function updateFighter(
    fighter: string,
    win: boolean,
    lose: boolean,
    draw: boolean
) {
    const user = await db.query("SELECT * FROM fighters WHERE username=$1", [
        fighter,
    ]);

    if (!user.rowCount) {
        db.query(
            "INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)",
            [fighter, +win, +lose, +draw]
        );

        return;
    }

    const type = win ? "wins" : lose ? "losses" : draw ? "draws" : "";
    const value = user.rows[0][type];

    db.query(`UPDATE fighters SET ${type}=$1 WHERE username=$2`, [
        value + 1,
        fighter,
    ]);
}

async function getRanking() {
    return (await db.query("SELECT * FROM fighters ORDER BY wins DESC")).rows;
}

const fightersRepository = {
    updateFighter,
    getRanking,
};
export default fightersRepository;
