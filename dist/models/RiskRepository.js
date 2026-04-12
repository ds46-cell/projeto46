"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRiskEvaluation = saveRiskEvaluation;
const connection_1 = require("../connection");
async function saveRiskEvaluation(transactionId, unifiedScore, category, modelVersion, weights) {
    await connection_1.pool.query(`INSERT INTO risk_evaluations 
        (transaction_id, unified_score, category, model_version, weights)
        VALUES ($1, $2, $3, $4, $5)`, [transactionId, unifiedScore, category, modelVersion, weights]);
}
