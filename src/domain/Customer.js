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
    this.setBalance(this.getBalance() + amount);
  }

  getMortgage(amount) {
    if (this.isEligibleForMortgage(amount)) {
      this.updateBalance(amount);
      return true;
    }
    return false;
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
