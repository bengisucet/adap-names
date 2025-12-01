import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        if(source.length === 0){
            this.name = "";
            this.noComponents = 0;
        } else {
            this.name = source;
            const partsOfString = this.name.split(this.delimiter);
            this.noComponents = partsOfString.length;
        }
    }


    /*public isEqual(other: Name): boolean {
        throw new Error("needs implementation or deletion");
    }
    //moved to abstractname
    public getHashCode(): number {
        throw new Error("needs implementation or deletion");
    }*/

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

     public isEmpty(): boolean {
            return this.noComponents === 0;
        }

    public getDelimiterCharacter(): string {
            return this.delimiter;
        }

     public getNoComponents(): number {
             return this.noComponents;
        }

     public getComponent(x: number): string {
         if(n < 0 || n >= this.noComponents){
             throw new IllegalArgumentException("index out of range");
         }
         if(this.name.length === 0){
             return "";
         }
         const partsOfString = this.name.split(this.delimiter);
         return partsOfString[n];
     }

    public setComponent(n: number, c: string): void {
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("index out of range");
        }

        const oldCount = this.noComp
        let partsOfString: string[];
        if (this.name.length === 0) {
            partsOfString = [];
        } else {
            partsOfString = this.name.split(this.delimiter);

        partsOfString[i] = c;
        this.name = partsOfString.join(this.delimiter);
        this.noComponents = partsOfString.

        MethodFailedException.assertCondition(this.noComponents === oldCount,
            "setComponent mustnt change component count");
        MethodFailedException.assertCondition(this.getComponent(i) === c,
            "setComponent diddnt set requested component");

        const n = this.getNoComponents();

        if (n < 0 || (this.isEmpty() !== (n === 0))) {
            throw new InvalidStateException("Name invariant violated after setComponent");
        }
    }

    public insert(n: number, c: string): void {
        if (i < 0 || i > this.noComponents) {
            throw new IllegalArgumentException("index out of range");
        }

        const oldCount = this.noComp
        let partsOfString: string[];
        if (this.name.length === 0) {
             partsOfString = [];
        } else {
             partsOfString = this.name.split(this.delimiter);

        partsOfString.splice(i, 0, c);
        this.name = partsOfString.join(this.delimiter);
        this.noComponents = partsOfString.

         MethodFailedException.assertCondition(this.noComponents === oldCount + 1,
             "insert must increas count by 1");

         MethodFailedException.assertCondition(this.getComponent(i) === c,
             "insert must place new component at index i");

             const n = this.getNoComponents();
             if (n < 0 || (this.isEmpty() !== (n === 0))) {
                 throw new InvalidStateException("Name invariant violated after insert");
             }
        }

        public append(c: string): void {
            this.insert(this.noComponents, c);
        }

        public remove(n: number): void {
           if (i < 0 || i >= this.noComponents) {
               throw new IllegalArgumentException("index out of range");
           }

           const oldCount = this.noComponents;

           let partsOfString: string[];
           if (this.name.length === 0) {
               partsOfString = [];
           } else {
               partsOfString = this.name.split(this.delimiter);
           }

           partsOfString.splice(i, 1);
           this.name = partsOfString.join(this.delimiter);
           this.noComponents = partsOfString.length;

           MethodFailedException.assertCondition(this.noComponents === oldCount - 1,
              "remove must decrease component count by 1");

           const n = this.getNoComponents();
           if (n < 0 || (this.isEmpty() !== (n === 0))) {
               throw new InvalidStateException("Name invariant violated after remove");
           }
       }
}