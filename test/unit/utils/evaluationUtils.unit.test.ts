import { describe, it, expect } from "vitest";
import {
  getEvaluationDescription,
  getEvaluationValue,
} from "@/utils/evaluationUtils";

describe("evaluationUtils", () => {
  describe("getEvaluationDescription", () => {
    it("should return the correct description for value 1", () => {
      expect(getEvaluationDescription(1)).toBe("Roubos de Halloween 🎃");
    });

    it("should return the correct description for value 2", () => {
      expect(getEvaluationDescription(2)).toBe("Tatuagem do Holt 🐶");
    });

    it("should return the correct description for value 3", () => {
      expect(getEvaluationDescription(3)).toBe("Máquina de doces 🍬");
    });

    it("should return the correct description for value 4", () => {
      expect(getEvaluationDescription(4)).toBe("Comissária Want 🧹");
    });

    it("should return the correct description for value 5", () => {
      expect(getEvaluationDescription(5)).toBe("Pai do Peralta ☠");
    });
  });

  describe("getEvaluationValue", () => {
    it("should return 1 for 'Roubos de Halloween 🎃'", () => {
      expect(getEvaluationValue("Roubos de Halloween 🎃")).toBe(1);
    });

    it("should return 2 for 'Tatuagem do Holt 🐶'", () => {
      expect(getEvaluationValue("Tatuagem do Holt 🐶")).toBe(2);
    });

    it("should return 3 for 'Máquina de doces 🍬'", () => {
      expect(getEvaluationValue("Máquina de doces 🍬")).toBe(3);
    });

    it("should return 4 for 'Comissária Want 🧹'", () => {
      expect(getEvaluationValue("Comissária Want 🧹")).toBe(4);
    });

    it("should return 5 for 'Pai do Peralta ☠'", () => {
      expect(getEvaluationValue("Pai do Peralta ☠")).toBe(5);
    });
  });
});
