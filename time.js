const d = new Date()
const ye = d.getFullYear();
const mo = d.getMonth() + 1;
const da = d.getDate();
const dt = `${ye}-${mo}-${da}`;
const dtPlusSev = `${ye}-${mo}-${da + 7}`;


module.exports = {dt, dtPlusSev};

