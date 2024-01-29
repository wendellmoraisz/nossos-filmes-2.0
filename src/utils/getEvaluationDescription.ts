import evaluations from "../data/constants/evaluations";

export default function getEvaluationDescription(evaluationValue: number) {
    const filterEvaluation = evaluations.filter(evaluation => evaluation.value === evaluationValue);
    return filterEvaluation[0].description;
}