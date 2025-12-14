import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assert(this.isValidDelimiter(delimiter));
        this.delimiter = delimiter;
    }

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assert(this.isValidDelimiter(delimiter));

        const n = this.getNoComponents();
        if (n === 0) {
            return "";
        }

        const parts: string[] = [];
        for (let i = 0; i < n; i++) {
            parts.push(this.getComponent(i));
        }

        return parts.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        if (other == null) {
            return false;
        }

        const otherDelim = (other as any).getDelimiterCharacter?.() as string | undefined;
        if (otherDelim !== undefined && otherDelim !== this.delimiter) {
            return false;
        }

        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }

        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }

        return true;
    }

    public getHashCode(): number {
        let hash = 17;
        hash = (hash * 31 + this.delimiter.charCodeAt(0)) | 0;

        const n = this.getNoComponents();
        for (let i = 0; i < n; i++) {
            const comp = this.getComponent(i);
            for (let j = 0; j < comp.length; j++) {
                hash = (hash * 31 + comp.charCodeAt(j)) | 0;
            }
        }

        return hash;
    }

    public isEmpty(): boolean {
        const n = this.getNoComponents();
        if (n < 0) {
            throw new InvalidStateException("Name invariant violated");
        }
        return n === 0;
    }

    public getDelimiterCharacter(): string {
        if (this.delimiter.length !== 1) {
            throw new InvalidStateException("delimiter must have length 1");
        }
        return this.delimiter;
    }

    public append(c: string): Name {
        return this.insert(this.getNoComponents(), c);
    }

    public concat(other: Name): Name {
        IllegalArgumentException.assert(other != null);

        const oldCount = this.getNoComponents();
        const otherCount = other.getNoComponents();

        let result: Name = this;
        for (let i = 0; i < otherCount; i++) {
            result = result.append(other.getComponent(i));
        }

        MethodFailedException.assertCondition(
            result.getNoComponents() === oldCount + otherCount,
            "concat must append all components"
        );

        return result;
    }

    protected isValidDelimiter(delimiter: string): boolean {
        return delimiter != null && delimiter.length === 1 && delimiter !== ESCAPE_CHARACTER;
    }

    protected isValidIndex(i: number, allowEnd: boolean = false): boolean {
        if (!Number.isInteger(i)) {
            return false;
        }
        const n = this.getNoComponents();
        return allowEnd ? (i >= 0 && i <= n) : (i >= 0 && i < n);
    }

    protected isValidComponent(component: string): boolean {
        if (component == null) {
            return false;
        }

        for (let i = 0; i < component.length; i++) {
            const ch = component[i];

            if (ch === this.delimiter) {
                return false;
            }

            if (ch === ESCAPE_CHARACTER) {
                if (i + 1 >= component.length) {
                    return false;
                }
                const next = component[i + 1];
                if (next !== this.delimiter && next !== ESCAPE_CHARACTER) {
                    return false;
                }
                i++;
            }
        }

        return true;
    }

    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;
    public abstract setComponent(i: number, c: string): Name;
    public abstract insert(i: number, c: string): Name;
    public abstract remove(i: number): Name;
}
