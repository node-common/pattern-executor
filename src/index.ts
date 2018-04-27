import {PatternStorage} from "./pattern.storage";

export class PatternExecutor {

    private static stor: {[key: string] : PatternStorage<any>}  = null;

    /**
     * Retrieve some storage which operates scoped data
     * -------------------------------------------------------------------------
     * @param {string} forName
     * @returns {PatternStorage<any>}
     */
    public static storage(forName: string = "_def") : PatternStorage<any> {

        if(!this.stor.hasOwnProperty(forName))

            this.stor[forName] = new PatternStorage();

        return this.stor[forName];

    }

    /**
     * Parse some string to Scoped string
     * -------------------------------------------------------------------------
     * @param {string} s
     * @param {string} scopeSeparator
     * @returns {ScopedString}
     */
    public static parseString(s: string, scopeSeparator = ':') : ScopedString {

        let splitIndex: number = null;

        for(let i = 0; i < s.length; i++) {

            if(s[i] === ':')

                splitIndex = i;

        }

        if(splitIndex !== null) {

            let left = "";
            let right = "";

            for(let i = 0; i < s.length; i++) {

                if(i < splitIndex)
                    left += s[i];
                else if(i > splitIndex)
                    right += s[i];

            }

            return {
                pattern: left.split(scopeSeparator),
                search: right
            }

        }

        return {
            pattern: [],
            search: s
        }

    }

}

export interface ScopedString {
    pattern: string[];
    search: string;
}

export interface ScopedRoute<T> {
    name: string;
    exec: T
}