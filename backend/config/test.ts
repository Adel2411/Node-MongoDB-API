import commonConfig from "./common";

export default {
    ...commonConfig,
    port: process.env.PORT || 1337,
};