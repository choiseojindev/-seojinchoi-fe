export function someAction(/* context */) {}

export function setStep({ commit }, step) {
  commit("setStep", step);
}
