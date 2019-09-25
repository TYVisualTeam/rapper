"use strict";
exports.__esModule = true;
var constant_1 = require("./constant");
/** 请求链接 */
function getEndpoint(serverAPI, url) {
    return "" + serverAPI + url;
}
/** 生成 index.ts */
function createIndexStr() {
    return "\n    /**\n     * \u672C\u6587\u4EF6\u7531 Rapper \u4ECE Rap \u4E2D\u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u4FEE\u6539\n     */\n\n    import { useAPI, useAPIAll, clearAPI } from './useRap'\n    import fetch from './fetch'\n    import { getAction } from './redux'\n    \n    export { useAPI, useAPIAll, clearAPI, fetch, getAction };\n    ";
}
exports.createIndexStr = createIndexStr;
/** 定义 请求types interface  */
function getRequestTypesInterfaceStr(interfaces) {
    return "\n        export interface IRequestTypes {\n        " + interfaces
        .map(function (_a) {
        var modelName = _a.modelName;
        return "\n                    '" + modelName + "': [\n                        '" + modelName + "_REQUEST',\n                        '" + modelName + "_SUCCESS',\n                        '" + modelName + "_FAILURE',\n                    ]\n                ";
    })
        .join('\n\n') + "\n        }\n    ";
}
/** 定义 请求action interface  */
function getRequestActionInterfaceStr(interfaces, serverAPI) {
    return "\n        export interface IRequestAction {\n        " + interfaces
        .map(function (_a) {
        var modelName = _a.modelName, method = _a.method, url = _a.url;
        return "\n                    '" + modelName + "': (params?: ModelItf['" + modelName + "']['Req']) => {\n                        type: '" + constant_1.RAP_REDUX_REQUEST + "',\n                        payload: {\n                            modelName: '" + modelName + "'\n                            endpoint: '" + getEndpoint(serverAPI, url) + "'\n                            method: '" + method + "'\n                            params?: ModelItf['" + modelName + "']['Req']\n                            types: ['" + modelName + "_REQUEST', '" + modelName + "_SUCCESS', '" + modelName + "_FAILURE']\n                        }\n                    },\n                ";
    })
        .join('\n\n') + "\n        }\n    ";
}
/** 定义 请求types */
function getRequestTypesStr(interfaces, serverAPI) {
    return "\n        export const RequestTypes:IRequestTypes = {\n            " + interfaces
        .map(function (_a) {
        var modelName = _a.modelName;
        return "\n                        '" + modelName + "': [\n                            '" + modelName + "_REQUEST',\n                            '" + modelName + "_SUCCESS',\n                            '" + modelName + "_FAILURE',\n                        ],\n                    ";
    })
        .join('\n\n') + "\n        }\n    ";
}
/** 定义 请求action */
function getRequestActionStr(interfaces, serverAPI) {
    return "\n        export const RequestAction:IRequestAction = {\n            " + interfaces
        .map(function (_a) {
        var id = _a.id, repositoryId = _a.repositoryId, moduleId = _a.moduleId, name = _a.name, url = _a.url, modelName = _a.modelName, method = _a.method;
        return "\n                        /**\n                         * \u63A5\u53E3\u540D\uFF1A" + name + "\n                         * Rap \u5730\u5740: http://rap2.alibaba-inc.com/repository/editor?id=" + repositoryId + "&mod=" + moduleId + "&itf=" + id + "\n                         */\n                        '" + modelName + "': (params) => ({\n                            type: '" + constant_1.RAP_REDUX_REQUEST + "',\n                            payload: {\n                                modelName: '" + modelName + "',\n                                endpoint: '" + getEndpoint(serverAPI, url) + "',\n                                method: '" + method + "',\n                                params,\n                                types: RequestTypes['" + modelName + "'],\n                            },\n                        }),\n                    ";
    })
        .join('\n\n') + "\n        }\n    ";
}
function createReduxStr(interfaces, _a) {
    var projectId = _a.projectId, serverAPI = _a.serverAPI;
    return "\n    /**\n     * \u672C\u6587\u4EF6\u7531 Rapper \u4ECE Rap \u4E2D\u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u4FEE\u6539\n     * Rap \u5730\u5740: http://rap2.alibaba-inc.com/repository/editor?id=" + projectId + "\n     */\n\n    import { ModelItf } from './model'\n\n    /** request interface */\n    export type RequestType = " + interfaces.reduce(function (a, _a) {
        var modelName = _a.modelName;
        return a + " | '" + modelName + "'";
    }, '') + "\n\n    /** \u8BF7\u6C42types interface  */\n    " + getRequestTypesInterfaceStr(interfaces) + "\n\n    /** \u8BF7\u6C42action interface  */\n    " + getRequestActionInterfaceStr(interfaces, serverAPI) + "\n\n    /** \u8BF7\u6C42types */\n    " + getRequestTypesStr(interfaces, serverAPI) + "\n\n    /** \u8BF7\u6C42action */\n    " + getRequestActionStr(interfaces, serverAPI) + "\n\n    export function getAction(requestPath: RequestType) {\n        return RequestTypes[requestPath] || []\n    }\n    ";
}
exports.createReduxStr = createReduxStr;
/** 生成 fetch.ts */
function createReduxFetchStr(projectId, interfaces) {
    return "\n    /**\n     * \u672C\u6587\u4EF6\u7531 Rapper \u4ECE Rap \u4E2D\u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u4FEE\u6539\n     * Rap \u5730\u5740: http://rap2.alibaba-inc.com/repository/editor?id=" + projectId + "\n     */\n    import { dispatchAction } from '@ali/rapper-redux';\n    import { ModelItf } from './model';\n    import { RequestAction } from './redux';\n\n    const request = {\n        " + interfaces
        .map(function (_a) {
        var modelName = _a.modelName, name = _a.name, repositoryId = _a.repositoryId, moduleId = _a.moduleId, id = _a.id;
        return "\n        /**\n         * \u63A5\u53E3\u540D\uFF1A" + name + "\n         * Rap \u5730\u5740: http://rap2.alibaba-inc.com/repository/editor?id=" + repositoryId + "&mod=" + moduleId + "&itf=" + id + "\n         * @param req \u8BF7\u6C42\u53C2\u6570\n         */\n        '" + modelName + "': (req?: ModelItf['" + modelName + "']['Req']): Promise<ModelItf['" + modelName + "']['Res']> => {\n            const action = RequestAction['" + modelName + "'](req)\n            return dispatchAction(action)\n        }";
    })
        .join(',\n\n') + "\n    };\n    export default request;\n    ";
}
exports.createReduxFetchStr = createReduxFetchStr;
/** 生成 useRap.ts */
function createUseRapStr(interfaces) {
    return "\n    /**\n     * \u672C\u6587\u4EF6\u7531 Rapper \u4ECE Rap \u4E2D\u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u4FEE\u6539\n     */\n    import { useState, useEffect } from 'react';\n    import { useSelector } from 'react-redux';\n    import { ModelItf } from './model';\n    import { RAP_STATE_KEY, dispatchAction, RAP_REDUX_CLEAR_STORE } from '@ali/rapper-redux';\n\n    /** \u6DF1\u6BD4\u8F83 */\n    function looseEqual(newData: any, oldData: any): boolean {\n        const newType = Object.prototype.toString.call(newData)\n        const oldType = Object.prototype.toString.call(oldData)\n    \n        if (newType !== oldType) {\n            return false\n        }\n    \n        if (newType === '[object Object]' || newType === '[object Array]') {\n            for (const key in newData) {\n                if (!looseEqual(newData[key], oldData[key])) {\n                    return false\n                }\n            }\n            for (const key in oldData) {\n                if (!looseEqual(newData[key], oldData[key])) {\n                    return false\n                }\n            }\n        } else if (newData !== oldData) {\n            return false\n        }\n    \n        return true\n    }\n\n    /** \u6839\u636E\u8BF7\u6C42\u53C2\u6570\u7B5B\u9009\uFF0C\u6682\u65F6\u53EA\u652F\u6301 request */\n    function paramsFilter<Req, Res, Fil extends { request?: Req }>(item: { request: Req; response: Res }, filter: Fil): boolean {\n        if (filter && filter.request) {\n            if (Object.prototype.toString.call(filter.request) === '[object Object]') {\n                const reqResult = Object.keys(filter.request).every((key: string): boolean => {\n                    return item.request[key] === filter.request[key]\n                })\n                if (!reqResult) {\n                    return false\n                }\n            } else {\n                return false\n            }\n        }\n        return true\n    }\n    /** \u6839\u636Efilter\u51FD\u6570\u81EA\u5B9A\u4E49\u7B5B\u9009 */\n    function functionFilter<Req, Res, Fil>(item: { request: Req; response: Res }, filter: Fil) {\n        if (filter !== undefined) {\n            if (typeof filter === 'function') {\n                return filter(item.request, item.response)\n            } else {\n                return false\n            }\n        }\n        return true\n    }\n\n    interface IState {\n        " + constant_1.RAP_STATE_KEY + ": any\n        [key: string]: any\n    }\n\n    const useAPI = {\n        " + interfaces
        .map(function (_a) {
        var modelName = _a.modelName, name = _a.name, repositoryId = _a.repositoryId, moduleId = _a.moduleId, id = _a.id;
        return "\n        /**\n         * \u63A5\u53E3\u540D\uFF1A" + name + "\n         * Rap \u5730\u5740: http://rap2.alibaba-inc.com/repository/editor?id=" + repositoryId + "&mod=" + moduleId + "&itf=" + id + "\n         */\n        /* tslint:disable */\n        '" + modelName + "': function useData(\n            filter?: { request?: ModelItf['" + modelName + "']['Req'] } | { (\n                request: ModelItf['" + modelName + "']['Req'],\n                response: ModelItf['" + modelName + "']['Res']\n            ): boolean }\n        ): [ModelItf['" + modelName + "']['Res'], boolean] {\n            const reduxData = useSelector((state: IState) => {\n                return (state[RAP_STATE_KEY] && state[RAP_STATE_KEY]['" + modelName + "']) || []\n            })\n            const [filteredData, setFilteredData] = useState({})\n            const [isFetching, setIsFetching] = useState(false)\n\n            type Req = ModelItf['" + modelName + "']['Req']\n            type Res = ModelItf['" + modelName + "']['Res']\n\n            useEffect(() => {\n                let resultArr = []\n                if (filter) {\n                    if (typeof filter === 'function') {\n                        resultArr = reduxData.filter((item: { request: Req; response: Res }) => functionFilter<Req, Res, typeof filter>(item, filter))\n                    } else {\n                        resultArr = reduxData.filter((item: { request: Req; response: Res }) => paramsFilter<Req, Res, typeof filter>(item, filter))\n                    }\n                } else {\n                    resultArr = reduxData\n                }\n                /** \u8FC7\u6EE4\u51FA\u4E00\u6761\u6700\u65B0\u7684\u7B26\u5408\u6761\u4EF6\u7684\u6570\u636E */\n                const result = resultArr.length ? resultArr.slice(-1)[0] : {}\n\n                if (!looseEqual(result, filteredData)) {\n                    setFilteredData(result.response)\n                    setIsFetching(result.isFetching)\n                }\n            }, [reduxData, filter])\n\n            return [filteredData, isFetching]\n        }";
    })
        .join(',\n\n') + "\n    }\n\n    const useAPIAll = {\n        " + interfaces
        .map(function (_a) {
        var modelName = _a.modelName, name = _a.name, repositoryId = _a.repositoryId, moduleId = _a.moduleId, id = _a.id;
        return "\n        /**\n         * \u63A5\u53E3\u540D\uFF1A" + name + "\n         * Rap \u5730\u5740: http://rap2.alibaba-inc.com/repository/editor?id=" + repositoryId + "&mod=" + moduleId + "&itf=" + id + "\n         */\n        /* tslint:disable */\n        '" + modelName + "': function useData(): ModelItf['" + modelName + "']['Res'][] {\n            return useSelector((state: IState) => {\n                const selectedState = (state[RAP_STATE_KEY] && state[RAP_STATE_KEY]['" + modelName + "']) || []\n                return selectedState\n            })\n        }";
    })
        .join(',\n\n') + "\n    }\n\n    /** \u91CD\u7F6E\u63A5\u53E3\u6570\u636E */\n    const clearAPI = {\n        " + interfaces
        .map(function (_a) {
        var modelName = _a.modelName, name = _a.name, repositoryId = _a.repositoryId, moduleId = _a.moduleId, id = _a.id;
        return "\n        /**\n         * \u63A5\u53E3\u540D\uFF1A" + name + "\n         * Rap \u5730\u5740: http://rap2.alibaba-inc.com/repository/editor?id=" + repositoryId + "&mod=" + moduleId + "&itf=" + id + "\n         */\n        '" + modelName + "': (): void => {\n            dispatchAction({\n                type: RAP_REDUX_CLEAR_STORE, \n                payload: {\n                    ['" + modelName + "']: undefined,\n                }\n            })\n        }";
    })
        .join(',\n\n') + "\n    }\n\n    export { useAPI, useAPIAll, clearAPI };\n    ";
}
exports.createUseRapStr = createUseRapStr;
