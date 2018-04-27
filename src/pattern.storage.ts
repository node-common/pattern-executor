import {ScopedRoute} from "./index";
import {PatternNode} from "./pattern.node";

export class PatternStorage<T> {

    private corners: PatternNode<T>[] = [];

    private definedRoutes: {[key: string] : string[]} = {};

    /**
     * Get map of all defined routes
     * -----------------------------------------------------------------------
     * @returns {}
     */
    public getMap() : {[key: string] : string[]} {

        return this.definedRoutes;

    }

    /**
     * Add pattern for some name
     * -----------------------------------------------------------------------
     * @param {string} name
     * @param {string[]} pattern
     * @param {T} exec
     * @returns {PatternNode<T>}
     */
    public add(name: string, pattern: string[], exec?: T) : PatternNode<T> {

        let iterator = 0;

        let nodeList = this.corners;

        let node = null;

        while (iterator < pattern.length) {

            node = null;

            for(const n of nodeList) {

                if(n.value === pattern[iterator]) {

                    node = n;
                    break;

                }

            }

            if(node === null) {

                node = new PatternNode<T>(pattern[iterator++]);

                nodeList.push(node);

                nodeList = node.vertexTo;

            } else {

                nodeList = node.vertexTo;

                iterator++;

            }

        }

        node.name = name;

        if(typeof exec === "function") {

            node.exec = exec;

            this.definedRoutes[name] = pattern;

        }

        return node;

    }

    /**
     * Match some route to patterns presented
     * -----------------------------------------------------------------------
     * @param {string[]} pattern
     * @returns {ScopedRoute<T>}
     */
    public match(pattern: string[]) : ScopedRoute<T> {

        let iterator = 0;
        let nodeList = this.corners;
        let node = null;

        while (iterator < pattern.length) {

            node = null;

            for(const n of nodeList) {

                if(n.value === pattern[iterator]) {

                    node = n;
                    break;

                }

            }

            if(node) {

                nodeList = node.vertexTo;

                iterator++;

                continue;

            }

            break;

        }

        return node !== null ? {
            name: node.name,
            exec: node.exec
        } : null;

    }

}