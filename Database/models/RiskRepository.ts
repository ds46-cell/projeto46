import { pool } from "../connection";

export async function saveRiskEvaluation(
    transactionId: number,
    unifiedScore: number,
    category: string,
    modelVersion: string,
    weights: object
) {
    await pool.query(
        `INSERT INTO risk_evaluations 
        (transaction_id, unified_score, category, model_version, weights)
        VALUES ($1, $2, $3, $4, $5)`,
        [transactionId, unifiedScore, category, modelVersion, weights]
    );
}
