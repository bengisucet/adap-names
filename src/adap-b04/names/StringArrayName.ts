import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source.slice();
    }

    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
         if (i < 0 || i >= this.components.length) {
             throw new IllegalArgumentException("index out of range");
         }
         return this.components[i];
    }

    public setComponent(i: number, c: string): void {
         if (i < 0 || i >= this.components.length) {
             throw new IllegalArgumentException("index out of range");
         }
         this.components[i] = c;

          const oldCount = this.getNoComponents();

          this.components[i] = c;

          MethodFailedException.assertCondition(this.getNoComponents() === oldCount,
              "setComponent cant change count");

          MethodFailedException.assertCondition(this.components[i] === c,
              "setComponent didnt set requested component");

          const n = this.getNoComponents();
          if (n < 0 || (this.isEmpty() !== (n === 0))) {
              throw new InvalidStateException("Name invariant violated after setComponent");
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new IllegalArgumentException("index out of range");
        }
        const oldCount = this.getNoComponents();
        this.components.splice(i, 0, c);

         MethodFailedException.assertCondition(this.getNoComponents() === oldCount + 1,
         "insert must increase count by 1");

         MethodFailedException.assertCondition(this.components[i] === c,
         "insert must place new component at index i");

        const n = this.getNoComponents();
        if (n < 0 || (this.isEmpty() !== (n === 0))) {
            throw new InvalidStateException("Name invariant violated after insert");
        }
    }

    public append(c: string): void {
        const oldCount = this.getNoComponents();
        this.components.push(c);

        MethodFailedException.assertCondition(this.getNoComponents() === oldCount + 1,
        "append must increase count by 1");

        MethodFailedException.assertCondition(this.components[oldCount] === c,
        "append must place new component at the end");

         const n = this.getNoComponents();
         if (n < 0 || (this.isEmpty() !== (n === 0))) {
             throw new InvalidStateException("Name invariant violated after append");
         }
    }

    public remove(i: number): void {
         if (i < 0 || i >= this.components.length) {
             throw new IllegalArgumentException("index out of range");
         }

         const oldCount = this.getNoComponents();

         this.components.splice(i, 1);

         MethodFailedException.assertCondition(this.getNoComponents() === oldCount - 1,
         "remove must decrease count by 1");

         const n = this.getNoComponents();
         if (n < 0 || (this.isEmpty() !== (n === 0))) {
             throw new InvalidStateException("Name invariant violated after remove");
         }
     }
}