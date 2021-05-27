const anonymousRequirement = {
    check: function (params) { return checkIfAnonymous() },
    callback: function (next) { redirectToHub(next) }
}

const authorizedRequirement = {
    check: function (params) { return checkIfAuthorized() },
    callback: function (next) { redirectToSignIn(next) }
}

const checkIfAnonymous = () => {
    return !authHelper.common.isAuthorized()
}

const checkIfAuthorized = () => {
    return authHelper.common.isAuthorized()
}