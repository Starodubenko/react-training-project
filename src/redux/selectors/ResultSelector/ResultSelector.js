
const getResult = (state) => {
    return state.category.getIn(["categoryData", "result"])
};


export {getResult}