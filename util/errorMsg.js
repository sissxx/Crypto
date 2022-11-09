exports.getErrorMsg = (err) => {
let errMsg = err.message;

if(err.errors){
    errMsg = Object.values(err.errors)[0].message;

}
    return errMsg;

};