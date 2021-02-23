const WrongDataException = require('./exceptions/WrongDataException');
const NotEligibleForMortgageException = require('./exceptions/NotEligibleForMortgageException');

class MortgageApplicationQueueProcessor {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }

    processRequest(customerId, amountRequested) {
        const customer = this.customerRepository.get(customerId);

        if (customer === null)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);

        if (this.isEligibleForMortgage(customer, amountRequested))
            customer.updateBalance(amountRequested);
        else
            throw new NotEligibleForMortgageException();
    }

    isEligibleForMortgage(customer, amountRequested) {
        let isEligibleForMortgage = false;

        if (customer.badCreditHistoryCount === 0 && customer.balance > 0)
            isEligibleForMortgage = customer.balance * 2 >= amountRequested;

        return isEligibleForMortgage;
    }
}

MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER = 'Customer not found!';

module.exports = MortgageApplicationQueueProcessor;
