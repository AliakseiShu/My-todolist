import React from "react";
import App from "./App";
import {ReduxStoreDecorator} from "./stories/ReduxStoreDecorator";

export default {
    title: 'App/Component',
    component: App,
    decorators: [ReduxStoreDecorator]
}

export const AppExample = () => {
    return   <App/>

}