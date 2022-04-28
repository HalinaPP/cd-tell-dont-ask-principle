const CustomerRepository = require("./CustomerRepository");

class MortgageApplicationQueueProcessor {
  constructor(customerRepository) {
    this.customerRepository = new CustomerRepository(customerRepository);
  }

  processRequest(customerId, amountRequested) {
    const customer = this.customerRepository.getCustomer(customerId);
    customer.updateBalance(amountRequested);
  }
}

module.exports = MortgageApplicationQueueProcessor;
