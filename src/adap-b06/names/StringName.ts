import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter ?? DEFAULT_DELIMITER);

        IllegalArgumentException.assert(source != null);

        if (source.length === 0) {
            this.name = "";
            this.noComponents = 0;
            return;
        }

        const partsOfString = this.splitMasked(source);

        for (let i = 0; i < partsOfString.length; i++) {
            IllegalArgumentException.assert(this.isValidComponent(partsOfString[i]));
        }

        this.name = partsOfString.join(this.delimiter);
        this.noComponents = partsOfString.length;

        MethodFailedException.assertCondition(this.name === source,
            "source must be canonical for delimiter");
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        IllegalArgumentException.assert(this.isValidIndex(x));

        if (x < 0 || x >= this.noComponents) {
            throw new IllegalArgumentException("index out of range");
        }

        const partsOfString = this.splitMasked(this.name);
        return partsOfString[x];
    }

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(this.isValidIndex(i) && this.isValidComponent(c));

        const oldCount = this.getNoComponents();
        const partsOfString = this.splitMasked(this.name);
        partsOfString[i] = c;

        const result = new StringName(partsOfString.join(this.delimiter), this.delimiter);

        MethodFailedException.assertCondition(result.getNoComponents() === oldCount,
            "setComponent must not change component count");
        MethodFailedException.assertCondition(result.getComponent(i) === c,
            "setComponent must set requested component");

        return result;
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(this.isValidIndex(i, true) && this.isValidComponent(c));

        const oldCount = this.getNoComponents();
        const partsOfString = this.splitMasked(this.name);
        partsOfString.splice(i, 0, c);

        const result = new StringName(partsOfString.join(this.delimiter), this.delimiter);

        MethodFailedException.assertCondition(result.getNoComponents() === oldCount + 1,
            "insert must increase component count by 1");
        MethodFailedException.assertCondition(result.getComponent(i) === c,
            "insert must place component at index i");

        return result;
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(this.isValidIndex(i));

        const oldCount = this.getNoComponents();
        const partsOfString = this.splitMasked(this.name);
        partsOfString.splice(i, 1);

        const result = new StringName(partsOfString.join(this.delimiter), this.delimiter);

        MethodFailedException.assertCondition(result.getNoComponents() === oldCount - 1,
            "remove must decrease component count by 1");

        return result;
    }

    private splitMasked(source: string): string[] {
        if (source.length === 0) {
            return [];
        }

        const partsOfString: string[] = [];
        let current = "";

        for (let i = 0; i < source.length; i++) {
            const ch = source[i];

            if (ch === ESCAPE_CHARACTER) {
                if (i + 1 >= source.length) {
                    throw new IllegalArgumentException("invalid escape at end of string");
                }
                const next = source[i + 1];
                if (next !== this.delimiter && next !== ESCAPE_CHARACTER) {
                    throw new IllegalArgumentException("invalid escape sequence");
                }
                current += ch + next;
                i++;
                continue;
            }

            if (ch === this.delimiter) {
                partsOfString.push(current);
                current = "";
                continue;
            }

            current += ch;
        }

        partsOfString.push(current);
        return partsOfString;
    }
}
