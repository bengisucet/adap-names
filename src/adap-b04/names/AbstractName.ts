import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AssertionDispatcher } from "../common/AssertionDispatcher";
import { ExceptionType } from "../common/ExceptionType";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        //super?.();
        this.delimiter = delimiter;
    }

    public clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
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
        const delimCode = this.delimiter.length > 0 ? this.delimiter.charCodeAt(0) : 0;
        hash = (hash * 31 + delimCode) | 0;

        for (let i = 0; i < this.getNoComponents(); i++) {
            const comp = this.getComponent(i);
            for (let j = 0; j < comp.length; j++) {
                hash = (hash * 31 + comp.charCodeAt(j)) | 0;
            }
        }
            return hash;
    }

    public abstract isEmpty(): boolean;

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

     public concat(other: Name): void {
           if (other == null) {
               throw new IllegalArgumentException("other cant be null");
           }

           const oldCount = this.getNoComponents();
           const otherCount = other.getNoComponents();

           for (let i = 0; i < otherCount; i++) {
               this.append(other.getComponent(i));
           }

            MethodFailedException.assertCondition(this.getNoComponents() === oldCount + otherCount,
                "concat must append all");

           const n = this.getNoComponents();
           if (n < 0 || (this.isEmpty() !== (n === 0))) {
               throw new InvalidStateException("Name invariant violated after concat");
           }
       }


}