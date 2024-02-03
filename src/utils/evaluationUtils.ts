import evaluations from "../data/constants/evaluations";

export function getEvaluationDescription(evaluationValue: number) {
    const filterEvaluation = evaluations.filter(evaluation => evaluation.value === evaluationValue);
    return filterEvaluation[0].description;
}

export function getEvaluationValue(evaluationDescription: string) {
    const filterEvaluation = evaluations.filter(evaluation => evaluation.description === evaluationDescription);
    return filterEvaluation[0].value;
}