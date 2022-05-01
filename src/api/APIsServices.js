import axios from "axios";
export const getByIdsFullInfo = (key, ids) => {
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    };
    return axios.get(
        `/projectservice/projects/collection/ids?api_key=${key}&projectIds=${ids}`,
        config
    );
};