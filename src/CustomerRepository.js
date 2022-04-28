const WrongDataException = require("./exceptions/WrongDataException");
const MESSAGE_INVALID_CUSTOMER = "Customer not found!";

module.exports = class CustomerRepository {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  getCustomer(customerId) {
    const customer = this.customerRepository.get(customerId);
    this.validateCustomer(customer);

    return customer;
  }

  validateCustomer(customer) {
    if (customer === null)
      throw new WrongDataException(MESSAGE_INVALID_CUSTOMER);
  }
};
