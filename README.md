# CodeEstimate
Simple browser extension that estimates problem ratings on CodeForces based on the number of people that have solved the task.

## Marketplace Links
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/codeestimate/)

# Features

A simple linear regression model is used to estimate the rating of a problem:
$$r = \frac{\frac{(s + 1)^\lambda - 1}{\lambda} - \mu}{\sigma}b_1 + b_0$$
Where:
- $r$ is the estimated rating 
- $s$ is the number of people that have solved the problem already
- $\lambda$ is the power parameter of Box-Cox transform
- $\mu$ and $\sigma$ are the mean and standard deviation of the normalization operation, respectively.
- $b_0$, $b_1$ are the intercept and coefficient of the linear regression model.

As the only input to the model is the amount of people that have solved the task, no additional requests are made by extension.

# How to Install

If your browser is not mentioned in the links section above, you may load the script as an unpacked extension. [Instructions for Google Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked), the process is similar for all Chromium-based browsers.