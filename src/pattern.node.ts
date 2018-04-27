export class PatternNode<T> {

    constructor(v: string) {
        this.value = v;
    }

    public value: string = null;

    public name: string = null;

    public exec: T = null;

    public vertexTo: PatternNode<T>[] = [];

}