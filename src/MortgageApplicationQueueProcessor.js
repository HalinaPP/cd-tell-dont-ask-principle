const CustomerRepository = require("./CustomerRepository");
const NotEligibleForMortgageException = require("./exceptions/NotEligibleForMortgageException");

class MortgageApplicationQueueProcessor {
  constructor(customerRepository) {
    this.customerRepository = new CustomerRepository(customerRepository);
  }

  processRequest(customerId, amountRequested) {
    const customer = this.customerRepository.getCustomer(customerId);

    if (!customer.getMortgage(amountRequested)) {
      throw new NotEligibleForMortgageException();
    }
  }
}

module.exports = MortgageApplicationQueueProcessor;
