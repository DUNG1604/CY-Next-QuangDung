export const formatPrice = (amount) => {

    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);

    if (amount % 1 === 0) {
        return formattedAmount.replace('.00', '');
    }

    return formattedAmount;
};
