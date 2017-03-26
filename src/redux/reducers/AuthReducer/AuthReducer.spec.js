import AuthReducer from "./AuthReducer"

describe('Auth reducer test', () => {

    it("If it's not correct action, reducer should leave default state", () => {
        expect(AuthReducer(undefined, {
            type: "unexpected",
            payload: {}
        })).to.deep.equal({
            user: null,
            logining: false,
            loggedIn: false,
            error: null
        });
    });

    it("If it's start log in action, reducer's logining field should be true", () => {
        expect(AuthReducer(undefined, {
            type: "START_LOG_IN_SYSTEM"
        })).to.deep.equal({
            user: null,
            logining: true,
            loggedIn: false,
            error: null
        });
    })
});