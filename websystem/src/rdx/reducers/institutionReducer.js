const defaultI = '0';

export default (state = defaultI, action) => { 
    switch (action.type) {
        case 'setInstitutionId':
            return action.institutionId;
        default: 
            return state;
    }
}
