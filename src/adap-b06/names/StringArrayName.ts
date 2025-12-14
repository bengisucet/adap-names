import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter ?? DEFAULT_DELIMITER);

        IllegalArgumentException.assert(source != null);
        this.components = source.slice();

        for (let i = 0; i < this.components.length; i++) {
            IllegalArgumentException.assert(this.isValidComponent(this.components[i]));
        }
    }

    public clone(): Name {
        return new StringArrayName(this.components.slice(), this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(this.isValidIndex(i));

        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("index out of range");
        }

        return this.components[i];
    }

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(this.isValidIndex(i) && this.isValidComponent(c));

        const oldCount = this.getNoComponents();
        const next = this.components.slice();
        next[i] = c;

        const result = new StringArrayName(next, this.delimiter);

        MethodFailedException.assertCondition(result.getNoComponents() === oldCount,
            "setComponent must not change component count");
        MethodFailedException.assertCondition(result.getComponent(i) === c,
            "setComponent must set requested component");

        return result;
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(this.isValidIndex(i, true) && this.isValidComponent(c));

        const oldCount = this.getNoComponents();
        const next = this.components.slice();
        next.splice(i, 0, c);

        const result = new StringArrayName(next, this.delimiter);

        MethodFailedException.assertCondition(result.getNoComponents() === oldCount + 1,
            "insert must increase component count by 1");
        MethodFailedException.assertCondition(result.getComponent(i) === c,
            "insert must place component at index i");

        return result;
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(this.isValidIndex(i));

        const oldCount = this.getNoComponents();
        const next = this.components.slice();
        next.splice(i, 1);

        const result = new StringArrayName(next, this.delimiter);

        MethodFailedException.assertCondition(result.getNoComponents() === oldCount - 1,
            "remove must decrease component count by 1");

        return result;
    }
}
