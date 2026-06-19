const getStartDateFromRange = (range) => {
    const now = new Date();

    switch (range) {
        case "3m":
            return new Date(
                now.getFullYear(),
                now.getMonth() - 3,
                now.getDate()
            );

        case "6m":
            return new Date(
                now.getFullYear(),
                now.getMonth() - 6,
                now.getDate()
            );

        case "12m":
            return new Date(
                now.getFullYear(),
                now.getMonth() - 12,
                now.getDate()
            );

        case "all":
        default:
            return null;
    }
};

module.exports = getStartDateFromRange;