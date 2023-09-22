// Learned constants for linear regression
const LAMBDA = 0.08479866;
const COEF = -621.26490566;
const INTERCEPT = 1864.0637242099765;
const MEAN = 11.45129307;
const SCALE = 3.12232122;


/**
 * Applies a Box-Cox transformation to a scalar.
 * The transform is as follows:
 * f(x) = ((x^lambda) - 1) / lambda
 * Additionaly, the x is incremented by one to ensure it is strictly positive before the transform.
 * @param {number} x - Number to be transformed.
 * @param {number} lambda - Power parameter of the transform.
 * @returns {number} The transformed data.
 */
function boxCox(x, lambda) {
    return (Math.pow(x + 1, lambda) - 1) / lambda;
}

/**
 * Perform normalization of the data by substracting the mean and then dividing by the scale.
 * @param {number} x - Data to be normalized.
 * @param {number} mean - The assumed mean of the data.
 * @param {number} scale - The assumed standard deviation of the data.
 * @returns {number} Data, normalized to Gaussian distribution, given the mean and scale are determined correctly.
 */
function normalize(x, mean, scale) {
    return (x - mean) / scale;
}

/**
 * Estimate the rating of the problem from the number of people that solved it.
 * The underlying model is a simple linear regression.
 * @param {string} solved - string containing the number of people that have solved the problem.
 * @returns {number} Estimated rating of the model.
 */
function estimateRatingFromSolved(solved) {
    let solvedCount = parseFloat(solved);
    return normalize(boxCox(solvedCount, LAMBDA), MEAN, SCALE) * COEF + INTERCEPT;
}

/**
 * Inserts the text where the rating of the problem would be displayed.
 * If the rating is already set by CodeForces, no change will be made.
 * @param {Element} row - Row of the table with available problems, passed as DOM element.
 * @param {string} text - Text that will be displayed as problem rating, if it is not already set.
 */
function insertIntoRow(row, text) {
    let span = document.createElement('span');
    span.classList.add('ProblemRating');
    span.textContent = `${text} (?)`;
    span.style.fontSize = "1.1rem";
    if (row.children[3].children.length == 0) {
        row.children[3].appendChild(span);
    }
}

/** Main function of the script. Estimates ratings of problems, and then displays them on the page. */
function main() {
    let rows = [...document.querySelectorAll("table.problems > tbody > tr")].slice(1);
    for (let row of rows) {
        let solvedCell = row.children[4];
        if (!solvedCell || !solvedCell.textContent) {
            continue;
        }
        let solved = solvedCell.textContent.trim().slice(1);
        let estimateRating = estimateRatingFromSolved(solved);
        estimateRating = Math.round(estimateRating / 100) * 100;
        if (estimateRating < 800) {
            estimateRating = 800;
        } else if (estimateRating > 3500) {
            estimateRating = 3500;
        }
        insertIntoRow(row, estimateRating.toFixed(0));
    }
}

main();
