const NotEligibleForMortgageException = require("../exceptions/NotEligibleForMortgageException");

module.exports = class Customer {
  constructor(id, firstName, lastName, balance, badCreditHistoryCount) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.balance = balance;
    this.badCreditHistoryCount = badCreditHistoryCount;
  }

  getBalance() {
    return this.balance;
  }

  setBalance(value) {
    this.balance = value;
  }

  updateBalance(amount) {
    this.validateEligibleForMortgage(amount);
    this.setBalance(this.getBalance() + amount);
  }

  validateEligibleForMortgage(amount) {
    if (this.isNotEligibleForMortgage(amount)) {
      throw new NotEligibleForMortgageException();
    }
  }

  isNotEligibleForMortgage(amount) {
    return !this.isEligibleForMortgage(amount);
  }

  isEligibleForMortgage(amount) {
    let isEligibleForMortgage = false;

    if (this.isCandidateForMortgage())
      isEligibleForMortgage = this.getBalance() * 2 >= amount;

    return isEligibleForMortgage;
  }

  isCandidateForMortgage() {
    return this.badCreditHistoryCount === 0 && this.getBalance() > 0;
  }
};
